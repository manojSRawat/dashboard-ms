import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent implements OnInit {
  @Input() tab;
  @Input() card;

  tableData = {
    "data": [
      {
        "compliance_percentage": {
          "value": "54"
        },
        "district_id": "25",
        "district_name": {
          "value": "RAMGARH"
        }
      },
      {
        "compliance_percentage": {
          "value": "59"
        },
        "district_id": "17",
        "district_name": {
          "value": "GUMLA"
        }
      },
      {
        "compliance_percentage": {
          "value": "68"
        },
        "district_id": "4",
        "district_name": {
          "value": "CHATRA"
        }
      },
      {
        "compliance_percentage": {
          "value": "66"
        },
        "district_id": "21",
        "district_name": {
          "value": "SARAIKELA-KHARSAWAN"
        }
      },
      {
        "compliance_percentage": {
          "value": "54"
        },
        "district_id": "16",
        "district_name": {
          "value": "LOHARDAGA"
        }
      },
      {
        "compliance_percentage": {
          "value": "58"
        },
        "district_id": "14",
        "district_name": {
          "value": "BOKARO"
        }
      },
      {
        "compliance_percentage": {
          "value": "53"
        },
        "district_id": "5",
        "district_name": {
          "value": "HAZARIBAG"
        }
      },
      {
        "compliance_percentage": {
          "value": "51"
        },
        "district_id": "24",
        "district_name": {
          "value": "KHUNTI"
        }
      },
      {
        "compliance_percentage": {
          "value": "64"
        },
        "district_id": "12",
        "district_name": {
          "value": "DUMKA"
        }
      },
      {
        "compliance_percentage": {
          "value": "69"
        },
        "district_id": "20",
        "district_name": {
          "value": "JAMTARA"
        }
      },
      {
        "compliance_percentage": {
          "value": "66"
        },
        "district_id": "3",
        "district_name": {
          "value": "PALAMU"
        }
      },
      {
        "compliance_percentage": {
          "value": "61"
        },
        "district_id": "7",
        "district_name": {
          "value": "GIRIDIH"
        }
      },
      {
        "compliance_percentage": {
          "value": "45"
        },
        "district_id": "15",
        "district_name": {
          "value": "RANCHI"
        }
      },
      {
        "compliance_percentage": {
          "value": "65"
        },
        "district_id": "11",
        "district_name": {
          "value": "PAKAUR"
        }
      },
      {
        "compliance_percentage": {
          "value": "69"
        },
        "district_id": "9",
        "district_name": {
          "value": "GODDA"
        }
      },
      {
        "compliance_percentage": {
          "value": "53"
        },
        "district_id": "19",
        "district_name": {
          "value": "PURBI SINGHBHUM"
        }
      },
      {
        "compliance_percentage": {
          "value": "55"
        },
        "district_id": "6",
        "district_name": {
          "value": "KODARMA"
        }
      },
      {
        "compliance_percentage": {
          "value": "71"
        },
        "district_id": "2",
        "district_name": {
          "value": "GARHWA"
        }
      },
      {
        "compliance_percentage": {
          "value": "54"
        },
        "district_id": "13",
        "district_name": {
          "value": "DHANBAD"
        }
      },
      {
        "compliance_percentage": {
          "value": "61"
        },
        "district_id": "22",
        "district_name": {
          "value": "SIMDEGA"
        }
      },
      {
        "compliance_percentage": {
          "value": "69"
        },
        "district_id": "18",
        "district_name": {
          "value": "PASHCHIMI SINGHBHUM"
        }
      },
      {
        "compliance_percentage": {
          "value": "55"
        },
        "district_id": "10",
        "district_name": {
          "value": "SAHIBGANJ"
        }
      },
      {
        "compliance_percentage": {
          "value": "61"
        },
        "district_id": "23",
        "district_name": {
          "value": "LATEHAR"
        }
      },
      {
        "compliance_percentage": {
          "value": "71"
        },
        "district_id": "8",
        "district_name": {
          "value": "DEOGHAR"
        }
      }
    ],
    "columns": [
      {
        "name": "District",
        "property": "district_name",
        "class": "text-center"
      },
      {
        "name": "",
        "property": "compliance_percentage",
        "class": "text-center",
        "valueSuffix": "%",
        "isHeatMapRequired": true,
        "color": {
          "type": "percentage",
          "values": [
            {
              "color": "#1D4586",
              "breakPoint": 75
            },
            {
              "color": "#1156CC",
              "breakPoint": 50
            },
            {
              "color": "#6D9FEB",
              "breakPoint": 0
            }
          ]
        }
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
