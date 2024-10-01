// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
  // load data
  const data = await d3.csv("videogames_wide.csv");

  // create a bar chart
  const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum")
    )
    .width("container")
    .height(400)
    .toSpec();

  vegaEmbed("#view", vlSpec).then((result) => {
    const view = result.view;
    view.run();
  });
}

render();
