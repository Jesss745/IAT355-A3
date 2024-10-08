async function render() {
  // load data
  const videoGameData = await d3.csv("data/videogames_wide.csv");
  const videoGameData2 = await d3.csv("data/videogames_long.csv");
  const over10mil = videoGameData.filter((item) => { return item.Global_Sales >= 10 });
  const Nintendo = videoGameData.filter((item) => { return item.Publisher === "Nintendo" });
  const Nintendo2 = videoGameData2.filter((item) => { return item.publisher === "Nintendo" });
  const bestSeller = Nintendo.filter((item) => { return item.Global_Sales >= 10 });
  const nonNA = videoGameData.filter((item) => { return item.Year != "N/A" });
  const nintendoNonNA = Nintendo.filter((item) => { return item.Year != "N/A" });

  // Visualization 1 - Genre
  const vlSpec = vl
    .markBar()
    .data(videoGameData)
    .title('Units Sold Globally Based on Video Game Genres')
    .encode(
      vl.x().fieldQ('Global_Sales').aggregate('sum').title('Unit Sold by Million'),
      vl.y().fieldN('Genre').sort('-x'),
      vl.tooltip('Global_Sales').aggregate('sum').format('0.2f')
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
      vl.x().fieldQ('Global_Sales').aggregate('sum').title('Units Sold in Millions'),
      vl.y().fieldN('Platform').sort('-x'),
      vl.tooltip('Global_Sales').aggregate('sum').format('0.2f')
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
    .data(nonNA)
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
    .data(nonNA)
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
      vl.color().fieldN('platform'),
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
    .markArc()
    .data(over10mil)
    .title("Game Publishers that Sold at Least 10 Million Units of their Game")
    .encode(
      vl.theta().fieldQ('Publisher').aggregate('count'),
      vl.color().fieldN('Publisher'),
      vl.tooltip(['Name', 'Year', 'Genre', 'Global_Sales']),
    )

    .width("container")
    .height(400)
    .toSpec();

  vegaEmbed("#v4circle", v4circle).then((result) => {
    view = result.v4circle;
    view.run();
  });

  const v4console = vl
    .markLine()
    .data(nintendoNonNA)
    .title("Platforms Nintendo has Created Games for")
    .encode(
      vl.x().fieldN('Year').title("Year"),
      vl.y().fieldN('Platform').title("Consoles").sort("x"),
      vl.color().fieldN('Platform')
    )
    .width("container")
    .height(400)
    .toSpec();

  vegaEmbed("#v4console", v4console).then((result) => {
    view = result.v4console;
    view.run();
  });

  const v4bestsells = vl
    .markBar()
    .data(bestSeller)
    .title("Nintendo games that sold more than 10 million units")
    .encode(
      vl.x().fieldQ('Global_Sales').aggregate('sum').title('sales by million(s)'),
      vl.y().fieldN('Name').title('Video Game Title').sort("-x"),
      vl.color().fieldN('Genre'),
      vl.tooltip(['Year', 'Genre', 'Global_Sales'])
    )
    .width("container")
    .height(500)
    .toSpec();

  vegaEmbed("#v4bestsells", v4bestsells).then((result) => {
    view = result.v4bestsells;
    view.run();
  });

  const v4genre = vl
    .markBar()
    .data(Nintendo)
    .title("Total Games in each Genre Nintendo has Released")
    .encode(
      vl.y().fieldQ('Global_Sales').aggregate('sum').title('sales by million(s)'),
      vl.x().fieldN('Genre').title('Video game genre').sort("-y"),
      vl.tooltip('Genre').aggregate('count'),
      vl.color('Genre').aggregate('count')
   )
    .width("container")
    .height(400)
    .toSpec();

  vegaEmbed("#v4genre", v4genre).then((result) => {
    view = result.v4genre;
    view.run();
  });

  const v4populargenre = vl
    .markBar()
    .data(Nintendo2)
    .encode(
      vl.y().fieldQ('sales_amount').title("Unit sold by million").aggregate('sum'),
        vl.x().fieldN('genre').title("Genre").sort('-y'),
        vl.facet().fieldN("sales_region").columns(1).title("Nintendo Game Genre's Popularity by Region"),
        vl.color().fieldN('genre'),
        vl.tooltip().fieldN(['genre']),
      )

    .width("container")
    .height(500)
    .toSpec();

  vegaEmbed("#v4populargenre", v4populargenre).then((result) => {
    view = result.v4populargenre;
    view.run();
  });
}

render();
