import React from "react";
import { VictoryLine, VictoryChart } from "victory";
import _, { toInteger } from "lodash";
import { ApiResponse } from "./useCoronaData";
export function transform(apiResponse: ApiResponse["features"]) {
  var flat = apiResponse.map(({ attributes }) => attributes);
  const withDates = flat.map((f) => ({
    ...f,
    Meldedatum: new Date(f.Meldedatum),
  }));
  const groupedByDate = _.groupBy(flat, (f) => f.Meldedatum);
  const paired = _.toPairs(groupedByDate);
  console.log(`paired`, paired);
  const agg = paired.map((pair) => ({
    date: new Date(toInteger(pair[0])),
    ...pair[1].reduce(
      (agg, curr) => ({
        case: agg.case + curr.AnzahlFall,
        death: agg.death + curr.AnzahlTodesfall
      }),
      { case: 0, death: 0 }
    ),
  }));
  return agg;

  // const aggregate = groupedByDate.map(grp=> grp.reduce((agg, curr)=>({

  // }), {}))
  const data = flat.map((d) => ({
    date: new Date(d.Meldedatum),
    new: d.AnzahlFall,
  }));

  return data;
  // [
  //   {
  //     id: "Infiziert",
  //     data,
  //   },
  // ];
}

export function Chart(props) {
  console.log(props);
  return (
    <VictoryChart>
      <VictoryLine data={props.data} x="date" y="case" />
      <VictoryLine data={props.data} x="date" y="death" />
    </VictoryChart>
  );
}
