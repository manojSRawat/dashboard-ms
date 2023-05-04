export const config = {
    
    filters: [
        {
            "name": "Academic Year",
            "id": "academicYear",
            "labelProp": "academicyear",
            "valueProp": "academicyear_id",
            "query": "select academicyear_id, academicyear from dimensions.academicyear"
        }
    ],
    config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {
            "avg_score": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id,  cctv.academicyear_id,  cctv.sum as has_cctv,  water.sum as has_water,  toilet.sum as has_toilet,  cwsn_toilet.sum as has_cwsn_toilet,  electricity.sum as has_electricity,  library.sum as has_library,  handwash.sum as has_handwash,  solar_panel.sum as has_solarpanel,  playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met,  school.school_name,  district_name,  block_name,  cluster_name from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table",

            "district_map": "select district_name, round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, block_name, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table  group by district_name",
            "district_avg_score": "select district_name, round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria, round( (sum(has_water)*100)/count(school_id) ) as percent_school_has_water, round( (sum(has_toilet)*100)/count(school_id) ) as percent_school_has_toilet, round( (sum(has_library)*100)/count(school_id) ) as percent_school_has_library, round( (sum(has_handwash)*100)/count(school_id) ) as percent_school_has_handwash, round( (sum(has_solarpanel)*100)/count(school_id) ) as percent_school_has_solarpanel, round( (sum(has_playground)*100)/count(school_id) ) as percent_school_has_playground FROM (select water.academicyear_id as academicyear_id, water.school_id as school_id, water.sum as has_water, toilet.sum as has_toilet, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (water.sum::int+toilet.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 6 then 1 else 0 end as criteria_met, school.school_name, district_name, block_name, cluster_name from datasets.school_infra_drinkingwater_school0academicyear as water inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = water.school_id) as intermediate_table  group by district_name",
        },
        "levels":'',
        "filters": [

        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "District",
                        property: "district_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "percent_school_has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "percent_school_has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "percent_school_has_cswn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "percent_school_has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "percent_school_has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "percent_school_has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "percent_school_has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "percent_school_has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "percent_school_has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
               "indicator":"percent_school_met_criteria",
                "metricFilterNeeded": false,
                "legend": { "title": "District-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "percent_school_met_criteria",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    district_config: {
        "label": "Schools Infrastructure",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {},
        "levels":'',
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "avg_score": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, cluster_name from datasets.school_infra_cctv_anxUZWllQgYCVhMCPgcG as cctv inner join datasets.school_infra_drinkingwater_B2JvNmBoSWx_bmldVWJ7 as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_fmpgclNmWWBzCR5RPhcO as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_MGx_YWJlV3RSbHRoQgwb as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_JmF_fGJqRnlSbHRoQgoA as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_cHVscH9QVW9nex0Nbw0K as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_fmZ7a3FtY2Nob28OM1gA as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_L2N5fmpnV2xSbHRoQhwD as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_IntsfGR8XGRSbHRoQh8A as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where district_id={district_id}",

                        "district_avg_score": "select block_name, round( (sum(has_water)*100)/count(school_id) ) as percent_school_has_water,     round( (sum(has_toilet)*100)/count(school_id) ) as percent_school_has_toilet,     round( (sum(has_cwsn_toilet)*100)/count(school_id) ) as percent_school_has_cswn_toilet,     round( (sum(has_electricity)*100)/count(school_id) ) as percent_school_has_electricity,     round( (sum(has_cctv)*100)/count(school_id) ) as percent_school_has_cctv,     round( (sum(has_library)*100)/count(school_id) ) as percent_school_has_library,     round( (sum(has_handwash)*100)/count(school_id) ) as percent_school_has_handwash,     round( (sum(has_solarpanel)*100)/count(school_id) ) as percent_school_has_solarpanel,     round( (sum(has_playground)*100)/count(school_id) ) as percent_school_has_playground FROM (select cctv.school_id,     cctv.academicyear_id,     cctv.sum as has_cctv,     water.sum as has_water,     toilet.sum as has_toilet,     cwsn_toilet.sum as has_cwsn_toilet,     electricity.sum as has_electricity,     library.sum as has_library,     handwash.sum as has_handwash,     solar_panel.sum as has_solarpanel,     playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met,     school.school_name,     district_name, district_id,     block_name, block_id,     cluster_name, cluster_id from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where  district_id = {district_id} and academicyear_id='2021-2022' group by block_name",
                       }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Block",
                        property: "block_name",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Drinking Water",
                        property: "percent_school_has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "percent_school_has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "percent_school_has_cswn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "percent_school_has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "percent_school_has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "percent_school_has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "percent_school_has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "percent_school_has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "percent_school_has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    block_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {},
        "levels":'',
        "filters": [
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "avg_score": "select round((sum(criteria_met)*100)/count(school_id)) as percent_school_met_criteria FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where block_id = {block_id}",

                        "district_avg_score": "select cluster_name, round( (sum(has_water)*100)/count(school_id) ) as percent_school_has_water, round( (sum(has_toilet)*100)/count(school_id) ) as percent_school_has_toilet, round( (sum(has_cwsn_toilet)*100)/count(school_id) ) as percent_school_has_cswn_toilet, round( (sum(has_electricity)*100)/count(school_id) ) as percent_school_has_electricity, round( (sum(has_cctv)*100)/count(school_id) ) as percent_school_has_cctv, round( (sum(has_library)*100)/count(school_id) ) as percent_school_has_library, round( (sum(has_handwash)*100)/count(school_id) ) as percent_school_has_handwash, round( (sum(has_solarpanel)*100)/count(school_id) ) as percent_school_has_solarpanel, round( (sum(has_playground)*100)/count(school_id) ) as percent_school_has_playground FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where block_id = {block_id} group by cluster_name",
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "Cluster",
                        property: "cluster_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "percent_school_has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "percent_school_has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "percent_school_has_cswn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "percent_school_has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "percent_school_has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "percent_school_has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "percent_school_has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "percent_school_has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "percent_school_has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 70
                                },
                                {
                                    color: "#fff2cc",
                                    breakPoint: 40
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint: 0
                                }
                            ]
                        }
                    },
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },

    cluster_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries":'',
        "queries": {},
        "levels":'',
        "filters": [
            {
                "name": "Cluster",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "avg_score": "select round( (sum(criteria_met)*100)/count(school_id) ) as percent_school_met_criteria FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name, cluster_id from datasets.school_infra_cctv_school0academicyear as cctv inner join datasets.school_infra_drinkingwater_school0academicyear as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_school0academicyear as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_school0academicyear as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_school0academicyear as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_school0academicyear as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_school0academicyear as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_school0academicyear as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_school0academicyear as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where cluster_id = {cluster_id}",
                        "district_avg_score": "select school_name, case when has_water = 1 THEN 'YES' ELSE 'NO' END as has_water, case when has_toilet = 1 THEN 'YES' ELSE 'NO' END as has_toilet, case when has_cwsn_toilet = 1 THEN 'YES' ELSE 'NO' END as has_cwsn_toilet, case when has_electricity = 1 THEN 'YES' ELSE 'NO' END as has_electricity, case when has_cctv = 1 THEN 'YES' ELSE 'NO' END as has_cctv, case when has_library = 1 THEN 'YES' ELSE 'NO' END as has_library, case when has_handwash = 1 THEN 'YES' ELSE 'NO' END as has_handwash, case when has_solarpanel = 1 THEN 'YES' ELSE 'NO' END as has_solarpanel, case when has_playground = 1 THEN 'YES' ELSE 'NO' END as has_playground FROM (select cctv.school_id, cctv.academicyear_id, cctv.sum as has_cctv, water.sum as has_water, toilet.sum as has_toilet, cwsn_toilet.sum as has_cwsn_toilet, electricity.sum as has_electricity, library.sum as has_library, handwash.sum as has_handwash, solar_panel.sum as has_solarpanel, playground.sum as has_playground, case when (cctv.sum::int+water.sum::int+toilet.sum::int+cwsn_toilet.sum::int+electricity.sum::int+library.sum::int+handwash.sum::int+solar_panel.sum::int+playground.sum::int) = 9 then 1 else 0 end as criteria_met, school.school_name, district_name, district_id, block_name, block_id, cluster_name, cluster_id from datasets.school_infra_cctv_anxUZWllQgYCVhMCPgcG as cctv inner join datasets.school_infra_drinkingwater_B2JvNmBoSWx_bmldVWJ7 as water on cctv.school_id = water.school_id and cctv.academicyear_id = water.academicyear_id inner join datasets.school_infra_toilet_fmpgclNmWWBzCR5RPhcO as toilet on toilet.school_id = water.school_id and toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_cwsntoilet_MGx_YWJlV3RSbHRoQgwb as cwsn_toilet on cwsn_toilet.school_id = water.school_id and cwsn_toilet.academicyear_id = water.academicyear_id inner join datasets.school_infra_electricty_JmF_fGJqRnlSbHRoQgoA as electricity on electricity.school_id = water.school_id and electricity.academicyear_id = water.academicyear_id inner join datasets.school_infra_library_cHVscH9QVW9nex0Nbw0K as library on library.school_id = water.school_id and library.academicyear_id = water.academicyear_id inner join datasets.school_infra_handwash_fmZ7a3FtY2Nob28OM1gA as handwash on handwash.school_id = water.school_id and handwash.academicyear_id = water.academicyear_id inner join datasets.school_infra_solarpanel_L2N5fmpnV2xSbHRoQhwD as solar_panel on solar_panel.school_id = water.school_id and solar_panel.academicyear_id = water.academicyear_id inner join datasets.school_infra_playground_IntsfGR8XGRSbHRoQh8A as playground on playground.school_id = water.school_id and playground.academicyear_id = water.academicyear_id inner join dimensions.school on school.school_id = cctv.school_id) as intermediate_table where cluster_id = {cluster_id}"
                    }
                }
            }
        ],
        "options": {
            "table": {
                "columns": [
                    {
                        name: "School",
                        property: "school_name",
                        class: "text-center"
                    },
                    {
                        name: "Have Drinking Water",
                        property: "has_water",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have Toilet",
                        property: "has_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have CWSN Toilet",
                        property: "has_cwsn_toilet",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have Electricity",
                        property: "has_electricity",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have CCTV Cameras",
                        property: "has_cctv",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have Library",
                        property: "has_library",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have Handwash",
                        property: "has_handwash",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have Solar Panel",
                        property: "has_solarpanel",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                    {
                        name: "Have Playgrounds",
                        property: "has_playground",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#d8ead3",
                                    breakPoint: 1
                                },
                                {
                                    color: "#f4cccc",
                                    breakPoint:0
                                }
                                
                            ]
                        }
                    },
                ],
                "sortByProperty": "school_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "metricLabelProp": "category_name",
                "metricValueProp": "performance",
                "groupByColumn": "district_id",
                "metricFilterNeeded": true,
                "legend": { "title": "District-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "",
                        "value": "category_name",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    }
}

