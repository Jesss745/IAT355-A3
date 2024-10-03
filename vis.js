async function render() {
  // load data
  const videoGameData = await d3.csv("videogames_wide.csv");
  const videoGameData2 = await d3.csv("videogames_long.csv");

  //const over10mil = await videoGamesData.filter((item)=>{return item.Global_Sales >= 10})
  // bestSeller = Nintendo.filter((item)=>{return item.Global_Sales >= 10})
  // Nintendo = videoGamesData.filter((item)=>{return item.Publisher === "Nintendo"})
  // Nintendo2 = videoGamesData2.filter((item)=>{return item.publisher === "Nintendo"})

  // Visualization 1 - Genre
  const vlSpec = vl
    .markBar()
    .data(videoGameData)
    .title('Units Sold Globally Based on Video Game Genres')
    .encode(
      vl.y().fieldQ('Global_Sales').aggregate('sum').title('Unit Sold by Million'),
      vl.x().fieldN('Genre').sort('-y')
    )
    .width("container")
    .height(400)
    .toSpec();

    vegaEmbed("#v1genre", vlSpec).then((result) => {
      const view = result.v1genre;
      view.run();
    });

    // Visualization 1 - Platform
  const vlSpec2 = vl
    .markBar()
    .data(videoGameData)
    .title('Units Sold Globally Based on Video Game Platforms')
    .encode(
      vl.y().fieldQ('Global_Sales').aggregate('sum').title('Units Sold in Millions'),
      vl.x().fieldN('Platform').sort('-y')
    )
    .width("container")
    .height(400)
    .toSpec();

    vegaEmbed("#v1plat", vlSpec2).then((result) => {
      view = result.v1plat;
      view.run();
    });

 // Visualization 2 - Genre
  const selection = vl.selectPoint()
  const v2Spec = vl
    .markLine()
    .data(videoGameData)
    .title('Sales Over Time by Video Game Genres')
    .params(selection)
    .encode(
      vl.x().fieldN('Year').title("Year"),
      vl.y().fieldQ('Global_Sales').title("Units Sold in Millions").aggregate('sum'),
      vl.tooltip(['Genre']),
      vl.color().if(selection, vl.fieldN('Genre')).value('grey'),
      vl.opacity().if(selection, vl.value(0.8)).value(0.1),
    )
    .width("container")
    .height(400)
    .toSpec();

    vegaEmbed("#v2genre", v2Spec).then((result) => {
      view = result.v2genre;
      view.run();
    });

   // Visualization 2 - Platform
   const selection2 = vl.selectPoint()
   const v2Spec2 = vl
    .markLine()
    .data(videoGameData)
    .title("Sales Over Time by Video Game Platform")
    .params(selection2)
    .encode(
      vl.x().fieldN('Year').title("Year"),
      vl.y().fieldQ('Global_Sales').title("Units Sold in Millions").aggregate('sum'),
      vl.tooltip(['Platform']),
      vl.color().if(selection2, vl.fieldN('Platform')).value('grey'),
      vl.opacity().if(selection2, vl.value(0.8)).value(0.1),
    )
    .width("container")
    .height(400)
    .toSpec();
  
    vegaEmbed("#v2plat", v2Spec2).then((result) => {
      view = result.v2plat;
      view.run();
    });

  // Visualization 3
  const v3Spec = vl
  .markBar()
  .data(videoGameData2)
  .encode(
    vl.y().fieldQ('sales_amount').title("Units Sold in Millions").aggregate('sum'),
    vl.x().fieldN('platform').title("Video Game Platform").sort('-y'),
    vl.color().fieldN('platform').legend(null),
    vl.tooltip(['platform']),
    vl.facet().fieldN("sales_region").columns(1).title("Sales of Video Game Platforms by Region")
  )
  .width("container")
  .height(400)
  .toSpec();

  vegaEmbed("#v3", v3Spec).then((result) => {
    view = result.v3;
    view.run();
  });

    // Visualization 4
    const v4circle = vl
    vl.markArc().data(over10mil)
    .title("Game Publishers that Sold at Least 10 Million Units of their Game")
    .encode(
      vl.theta().fieldQ('Publisher').aggregate('count'),
      vl.color().fieldN('Publisher'), 
      vl.tooltip(['Name','Year','Genre']),
    )

    .width("container")
    .height(400)
    .toSpec();
  
    vegaEmbed("#v4circle", v4circle).then((result) => {
      view = result.v4circle;
      view.run();
    });

}

render();
