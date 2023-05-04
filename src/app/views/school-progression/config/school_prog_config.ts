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
        "timeSeriesQueries": '',
        "queries": {
            "avg_score": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022';",

            "district_map": "select school.district_name, school.district_id, round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022' group by school.district_name, school.district_id;",

            "district_avg_score": "select school.district_name, round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name is not null and district_name != '' and academicyear_id = '2021-2022' group by school.district_name order by round( (sum(progression.sum)*100)/count(progression.school_id) ) desc;",
        },
        "levels": '',
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
                        name: "Progression Frozen %",
                        property: "percent_school_met_criteria",
                        class: "text-center",
                        valueSuffix: "%",
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
                        },
                    }
                ],
                "sortByProperty": "district_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            },
            "map": {
                "indicator": "percent_school_met_criteria",
                "metricFilterNeeded": false,
                "legend": { "title": "District-wise Performance" },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "District Name: ",
                        "value": "district_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "% Schools that have frozen student progression: ",
                        "value": "percent_school_met_criteria",
                        "valueSuffix": "%"
                    }
                ]
            }
        }
    },

    district_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {},
        "levels": '',
        "filters": [
            {
                "name": "District",
                "labelProp": "district_name",
                "valueProp": "district_id",
                "hierarchyLevel": "2",
                "actions": {
                    "queries": {
                        "avg_score": "select round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022' and district_id = {district_id};",

                        "district_avg_score": "select block_name, round((sum(progression.sum)*100)/count(progression.school_id)) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where academicyear_id = '2021-2022' and district_id = {district_id} group by block_name;",
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
                        class: "text-center"
                    },
                    {
                        name: "Progression Frozen %",
                        property: "percent_school_met_criteria",
                        class: "text-center",
                        valueSuffix: "%",
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
                        },
                    }
                ],
                "sortByProperty": "block_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    block_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {},
        "levels": '',
        "filters": [
            {
                "name": "Block",
                "labelProp": "block_name",
                "valueProp": "block_id",
                "hierarchyLevel": "3",
                "actions": {
                    "queries": {
                        "avg_score": "select round( (sum(progression.sum)*100)/count(progression.school_id) ) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and block_id = {block_id};",

                        "district_avg_score": "select cluster_name, round( (sum(progression.sum)*100)/count(progression.school_id) ) as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and block_id = {block_id} group by cluster_name;",
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
                        name: "Progression Frozen %",
                        property: "percent_school_met_criteria",
                        class: "text-center",
                        valueSuffix: "%",
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
                        },
                    }
                ],
                "sortByProperty": "cluster_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    },

    cluster_config: {
        "label": "Schools Reporting Student Attendance",
        "defaultLevel": "state",
        "timeSeriesQueries": '',
        "queries": {},
        "levels": '',
        "filters": [
            {
                "name": "District",
                "labelProp": "cluster_name",
                "valueProp": "cluster_id",
                "hierarchyLevel": "4",
                "actions": {
                    "queries": {
                        "avg_score": "select coalesce(round((sum(progression.sum)*100)/count(progression.school_id))::text, '-') as percent_school_met_criteria from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and cluster_id = {cluster_id}",

                        "district_avg_score": "select school_name, case when progression.sum = 1 THEN 'YES' ELSE 'NO' END as progression_frozen from datasets.student_progression_progression_school0academicyear as progression inner join dimensions.school on progression.school_id = school.school_id where district_name != '' and cluster_id = {cluster_id};",
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
                        name: "Progression Frozen %",
                        property: "progression_frozen",
                        class: "text-center",
                        valueSuffix: "",
                        isHeatMapRequired: true,
                        color: {
                            type: "status",
                            values: [
                                {
                                    color: "#d8ead3",
                                    value: "yes"
                                },
                                {
                                    color: "#f4cccc",
                                    value: "no"
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "school_name",
                "sortDirection": "desc"
            },
            "bigNumber": {
                "valueSuffix": '%'
            }
        }
    }
}

