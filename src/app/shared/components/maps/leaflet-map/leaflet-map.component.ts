import { state } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";
import { StateCodes } from 'src/app/core/config/StateCodes';
import { environment } from 'src/environments/environment';
import invert from 'invert-color';
import mapJson from './../../../../../assets/data/JH.json';
import * as latLongConfig from './../../../../../assets/data/config.json'
import { RbacService } from 'src/app/core/services/rbac-service.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges {
  map: any;
  error = false;
  mapCenterLatlng: any;
  markers = new L.FeatureGroup();
  legend: any;
  countryGeoJSON: any;
  noData = false;
  config = environment.config
  rbacDetails: any;
  hierarchyLevel: any;

  @Input() mapData!: any;
  @Input() level: any;
  @Input() perCapitaReport: any = false;
  // @Input() hierarchyLevel: any = this.config === 'NVSK' ? 0 : 1;

  @Output() drillDownFilter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  constructor(private _rbacService: RbacService) {
    this.mapCenterLatlng = latLongConfig.default['IN'];
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
      this.hierarchyLevel = rbacDetails.role
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.markers.clearLayers();
    this.legend?.remove();
    // if (this.level === 'district') {
    //   // this.updateMap();
    //   this.initMap();
    // }
    // else {
    //   this.initMap();
    // }
    this.initMap();
  }

  async initMap(): Promise<any> {
    if (!this.mapContainer || !this.mapData) {
      return;
    }
    if (this.map) {
      this.map.remove();
    }
    let reportTypeBoolean = false;
    if (typeof this.mapData?.data[0]?.indicator === 'string') {
      reportTypeBoolean = true;
    }
    this.map = L.map(this.mapContainer.nativeElement, { zoomSnap: 0.05, minZoom: 4, zoomControl: true, scrollWheelZoom: false, touchZoom: false }).setView([this.mapCenterLatlng.lat, this.mapCenterLatlng.lng], this.mapCenterLatlng.zoomLevel);
    try {
      await this.applyCountryBorder(this.mapData);
      const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd'
      });

      tiles.addTo(this.map);
      this.map.attributionControl.setPrefix(false);
      // var imageUrl ='https://i.stack.imgur.com/khgzZ.png',
      // imageBounds = [[80.0, -350.0], [-40.0, 400.0]];
      // L.imageOverlay(imageUrl, imageBounds, {opacity: 0.3}).addTo(this.map);
      if (this.config === 'NVSK' && this.hierarchyLevel === 0 && this.level === 'district') {
        this.createMarkers(this.mapData);
      }
      if (this.hierarchyLevel < 3) {
        this.map.on('resize', () => {
          this.fitBoundsToCountryBorder();
        });
      }
    } catch (e) {
      console.error(e);
      this.error = true;
    }
  }

  invalidateSize(): void {
    this.map.invalidateSize();
  }

  updateMap(): void {
    if (!this.map) {
      this.initMap();
      return;
    }

    this.markers.clearLayers();
    this.legend?.remove();
    if (this.hierarchyLevel < 3) {
      this.fitBoundsToCountryBorder();
    }
    this.createMarkers(this.mapData);
  }

  getLayerColor(e: any, legend?: boolean) {
    if ((this.config === 'NVSK' && this.hierarchyLevel === 0) && this.level === 'district' && !legend) {
      return '#fff'
    }
    else {
      let reportTypeBoolean = false;
      return e > 70 ? "#d8ead3" :
          e > 40 ? "#fff2cc" :
              e >= 0 ? "#f4cccc" : "#fff";
      // if (typeof e === 'string') {
      //   reportTypeBoolean = true;
      // }
      // if (reportTypeBoolean) {
      //   if (e.trim().toLowerCase() == "yes") {
      //     return "#d8ead3";
      //   } else {
      //     return "#fff";
      //   }
      // }
      // else {
      //   {

      //   }
      // }
    }
  }

  async applyCountryBorder(mapData: any, singleColor?: any): Promise<any> {
    let reportTypeIndicator = this.mapData?.options && this.mapData.options.reportIndicatorType ? this.mapData.options.reportIndicatorType : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value'
    let parent = this;
    return new Promise(async (resolve, reject) => {
      try {
        let body;
        if (this.config === 'NVSK' && this.rbacDetails.role === 0) {
          const response = await fetch(`${environment.apiURL}/assets/IN.json`);
          const temp = await response.json();
          body = temp['IN']
        }
        else {
          const response = await fetch(`/assets/data/${environment.stateCode}.json`);
          body = await response.json();
        }

        const data = body;
        let min!: number, max!: number, values: any[] = [];
        let reportTypeBoolean = false;
        if (typeof mapData?.data[0]?.indicator === 'string') {
          reportTypeBoolean = true;
        }
        if (reportTypeBoolean === false) {
          mapData.data.forEach((data: any, index: number) => {
            if (index === 0) {
              min = data.indicator;
              max = data.indicator;
              return;
            }

            min = min <= data.indicator ? min : data.indicator;
            max = max >= data.indicator ? max : data.indicator;
          });

          let range = max - min;
          let partSize = (range / 4 % 1 === 0) ? range / 4 : Number((range / 4).toFixed(2));
          if (range && range <= 4) {
            for (let i = 1; i <= 5; i++) {
              if (i === 5) {
                if (min === 0) {
                  values.push(0.1);
                }
                else {
                  values.push(Number(min))
                }
              }
              else if (i === 1) {
                values.push(Number(max))
              }
              else if (i !== 4) {
                let value = Number((max - partSize * (i - 1)))
                values.push(value >= 1 ? value : 1)
              }
            }
          }
          else if (range > 4) {
            for (let i = 1; i <= 5; i++) {
              if (i === 5) {
                if (min === 0) {
                  values.push(this.perCapitaReport ? 0.1 : 1);
                }
                else {
                  values.push(this.perCapitaReport ? min : Math.floor(min))
                }
                continue;
              }

              if (i === 1) {
                values.push(this.perCapitaReport ? max : Math.ceil(max));
                continue;
              }
              if (i === 4) {
                continue;
              }
              if (this.perCapitaReport) {
                let value = Number((max - partSize * (i - 1)).toFixed(2))
                values.push(value)
              }
              else {
                let value = Number((max - partSize * (i - 1)).toFixed(0))
                values.push(value >= 1 ? value : 1)
              }
            }
          }
          else {
            values.push(min);
          }
          if (reportTypeIndicator === 'percent') {
            max = 100;
            min = 0;
          }

        }

        function styleStates(feature: any) {
          let color = '#fff';
          let reportTypeBoolean = false;
          if (typeof mapData?.data[0]?.indicator === 'string') {
            reportTypeBoolean = true;
          }
          // console.log("TEST", state)
          mapData?.data.forEach((state: any) => {
            console.log("TEST", state)
            if (state.state_id && state.state_id == feature.properties.state_code) {

              color = parent.getLayerColor(state.indicator);
            }
            else if (state.district_id && state.district_id == feature.properties.ID_2) {
              color = parent.getLayerColor(state.indicator);
              console.log({ color })
            }
          });
          if (parent.level === 'state' || parent.config === 'VSK' || parent.config === 'NVSK') {
            return {
              fillColor: singleColor ? (color === '#fff' ? color : singleColor) : color,
              weight: 1,
              opacity: 1,
              color: 'grey',
              dashArray: '0',
              fillOpacity: 1
            };
          }
          else {
            return
          }

        }

        function getPopUp(feature: any) {
          let popup: any;
          mapData.data.forEach((state: any) => {
            if (state.state_id == feature.properties.state_code && !state.district_id) {
              popup = state.tooltip
            }
            else if (state.district_id && state.district_id == feature.properties.ID_2) {
              popup = state.tooltip
            }
          });
          return popup;
        }

        this.countryGeoJSON = L.geoJSON(data['features'], {
          onEachFeature: function (feature: any, layer: any) {
            if (getPopUp(feature)) {
              layer.bindTooltip(getPopUp(feature), { classname: "app-leaflet-tooltip", sticky: true });
            }
          },
          style: styleStates,
          color: "#a0a1a3",
          weight: 1,
          fillOpacity: 0,
          fontWeight: "bold"
        }).addTo(this.map);
        if (this.hierarchyLevel < 3) {
          this.fitBoundsToCountryBorder();
        }
        // this.countryGeoJSON.eachLayer((layer: any) => {
        //   layer._path.id = StateCodes[Number(layer.feature.properties.state_code)];
        // });

        if (this.hierarchyLevel < 3 && !singleColor) {
          this.createLegend(reportTypeIndicator, this.mapData.options, values);
        }
        resolve('India map borders plotted successfully');
      } catch (e) {
        reject(e);
      }
    });
  }

  fitBoundsToCountryBorder(): void {
    this.map.fitBounds(this.countryGeoJSON.getBounds(), {
      padding: [100, 100]
    });
  }

  createMarkers(mapData: any, singleColor?: any): void {
    let reportTypeIndicator = this.mapData?.options?.map && this.mapData.options.map.reportTypeIndicator ? this.mapData.options.map.reportTypeIndicator : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value'
    if (mapData && this.level !== 'state') {
      let min!: number, max!: number, values: any[] = [];
      if (reportTypeIndicator === 'value' || reportTypeIndicator === 'percent') {
        mapData.data.forEach((data: any, index: number) => {
          if (index === 0) {
            min = data.indicator;
            max = data.indicator;
            return;
          }

          min = min <= data.indicator ? min : data.indicator;
          max = max >= data.indicator ? max : data.indicator;
        });

        let range = max - min;
        let partSize = (range / 4 % 1 === 0) ? range / 4 : Number((range / 4).toFixed(2));
        if (range && range <= 4) {
          for (let i = 1; i <= 5; i++) {
            if (i === 5) {
              if (min === 0) {
                values.push(0.1);
              }
              else {
                values.push(Number(min))
              }
            }
            else if (i === 1) {
              values.push(Number(max))
            }
            else if (i !== 4) {
              let value = Number((max - partSize * (i - 1)))
              values.push(value >= 1 ? value : 1)
            }
          }
        }
        else if (range > 4) {
          for (let i = 1; i <= 5; i++) {
            if (i === 5) {
              if (min === 0) {
                values.push(this.perCapitaReport ? 0.1 : 1);
              }
              else {
                values.push(this.perCapitaReport ? min : Math.floor(min));
              }
              continue;
            }

            if (i === 1) {
              values.push(this.perCapitaReport ? max : Math.ceil(max));
              continue;
            }
            if (i === 4) {
              continue;
            }
            if (this.perCapitaReport) {
              let value = Number((max - partSize * (i - 1)).toFixed(2))
              values.push(value)
            }
            else {
              let value = Number((max - partSize * (i - 1)).toFixed(0))
              values.push(value >= 1 ? value : 1)
            }
          }
        }
        else {
          values.push(min);
        }
      }
      mapData.data.forEach((data: any) => {
        let re = new RegExp("_id$");
        let filterIds = {};

        Object.keys(data).forEach((prop: any) => {
          // if(re.test(prop)){
          //   idProp = prop;
          //   return false;
          // }
          // return true;
          if (prop.match(re)) {
            filterIds = {
              ...filterIds,
              [prop.match(re).input]: data[prop.match(re)?.input]
            }
          }
        })
        let markerIcon = L.circleMarker([data.Latitude, data.Longitude], {
          filterIds: filterIds,
          hierarchyLevel: data.hierarchyLevel,
          color: "gray",
          // fillColor: this.getZoneColor(reportTypeIndicator, data.indicator >= 1 ? (max - min ? (data.indicator - min) / (max - min) * 100 : data.indicator) : -1),
          fillColor: singleColor ? singleColor : this.getZoneColor(reportTypeIndicator, data.indicator >= 1 ? (max - min ? (data.indicator - min) / (max - min) * 100 : data.indicator) : -1),
          fillOpacity: 1,
          strokeWeight: 0.01,
          weight: 1
        }).addTo(this.map);

        markerIcon._path.id = StateCodes[Number(data.state_code)];

        markerIcon.setRadius(5);

        const popup = R.responsivePopup({
          hasTip: false,
          autoPan: true,
          offset: [15, 20],
        }).setContent(
          data.tooltip
        );

        markerIcon.on("mouseover", (e: any) => {
          e.target.openPopup();
        });

        markerIcon.on("mouseout", (e: any) => {
          e.target.closePopup();
        });

        markerIcon.on("click", (e: any) => {
          this.drillDownMarker(e.target.options.filterIds)
        })

        markerIcon.addTo(this.map).bindPopup(popup, { closeButton: false });

        this.markers.addLayer(markerIcon);
      });

      this.map.addLayer(this.markers);
      if (this.hierarchyLevel > 2) {
        this.map.fitBounds(this.markers.getBounds(), {
          padding: [250, 250]
        });
      }
      if (!singleColor) {
        this.createLegend(reportTypeIndicator, this.mapData.options, values);
      }
    }
  }

  createLegend(reportTypeIndicator: string, mapOptions: any, values: any): void {
    let legend = L.control({ position: 'topright' });
    let ref = this;
    let labels: any[] = [];

    legend.onAdd = function (map: any) {
      let div = L.DomUtil.create('div', 'info legend text-center');
      let clickable = false;
      console.log("clickable", mapOptions)
      if (mapOptions.legend && mapOptions.legend.title) {
        labels.push(`<strong>${mapOptions.selectedMetric ? mapOptions.selectedMetric : mapOptions.legend.title}:</strong>`)
      }
      values = [100, 70, 40, 0]
      if (values.length <= 1 && reportTypeIndicator !== 'boolean') {
        labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[0] ? values[0] : -1, true)}"></i> ${values[0]}`);
      }
      else if (reportTypeIndicator === 'boolean') {
        values = ["Yes", "No"];
        for (let i = 0; i < values.length; i++) {
          labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[i])}"></i> ${values[i]}`);
        }
        // } else {
        //   values = values && values.length > 0 ? values : [100, 75, 50, 25, 0];
        //   for (let i = values.length; i > 1; i--) {
        //     labels.push(
        //       `<i class="fa  fa-square" style="color: ${ref.getLayerColor(25 * (i - 1), true)}"></i>
        //         <span>${values[values.length - i + 1] ? values[values.length - i + 1] : 0} &dash; ${values[values.length - i]}${reportTypeIndicator === 'percent' ? '%' : ''}</span>`
        //     );
        //   }
        // }
      } else {
        values = values && values.length > 0 && reportTypeIndicator !== 'percent' ? values : [100, 70, 40, 0];
        // div.innerHTML = labels[0] + '</br>';
        div.innerHTML = labels[0];
        let reset = L.DomUtil.create('button', 'legend-range-reset pull-right')
        reset.innerHTML = `<i class="fa fa-refresh"></i>`
        L.DomEvent.addListener(reset, 'click', () => {
          ref.resetRange()
        })
        div.insertBefore(reset, div.prevSibling)
        for (let i = 0; i < values.length - 1; i++) {
          console.log("value: " + values, 'data', values[i], i);
          let span = L.DomUtil.create('span', 'clickable-range');
          span.innerHTML = `<button class="legend-range" style="background-color: ${ref.getLayerColor(values[i], true)}; color: ${invert(ref.getLayerColor(values[i], true), true)}">${values[i] ? values[i] : 0} &dash; ${values[i+1]}${reportTypeIndicator === 'percent' ? '%' : ''}</button></br>`
          L.DomEvent.addListener(span, 'click', () => {
            ref.applyRange(Number(values[i] ? values[i] : 0), Number(values[i+1]), Number(values[values.length - 1]), ref.getLayerColor(values[i], true))
          })
          div.appendChild(span)
          clickable = true;
        }
      }

      // div.innerHTML = labels.join('<br>');

      if (!clickable) {
        div.innerHTML = labels.join('<br>');
      }
      return div;
    };
    legend.addTo(this.map);
    this.legend?.remove();
    this.legend = legend;
  }

  getZoneColor(reportTypeIndicator: string, value: string | number) {
    if (reportTypeIndicator === 'boolean') {
      if (value == "Yes") {
        return "#00FF00";
      } else {
        return "#FF0000";
      }
    } else {
      return Number(value) >= 70 ? "#d8ead3" :
        Number(value) >= 40 ? "#fff2cc" :
          Number(value) >= 0 ? "#f4cccc" : "#fff";
    }
  }

  resetRange() {
    this.applyCountryBorder(this.mapData)
  }

  applyRange(min: any, max: any, baseValue: any, rangeColour: any): void {
    let temp = this.mapData.data.filter((obj: any) => {
      return obj.indicator <= max && (min === baseValue ? obj.indicator >= min : obj.indicator > min)
    })
    let filteredData = {
      ...this.mapData,
      data: temp
    }
    if (this.config === 'NVSK') {
      this.markers.clearLayers();
      this.createMarkers(filteredData, rangeColour);
    }
    else {
      this.applyCountryBorder(filteredData, rangeColour);
    }
  }

  drillDownMarker(value: any) {
    this.drillDownFilter.emit(value);
  }
}
