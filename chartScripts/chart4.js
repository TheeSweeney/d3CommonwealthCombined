
var w = window.outerWidth - 50;
var h = w * .625 - 50;
var marginFour = {
  top: 108,
  bottom: 100,
  left: 40,
  right: 40
};
var width = w - marginFour.left - marginFour.right;
var height = h - marginFour.top - marginFour.bottom;

var svgFour = d3.select('#container4').append('svg')
            .classed('chart', true)
            .attr('width', w)
            .attr('height', h)
var chartFour = svgFour.append('g')
              .classed('displayFour', true)
              .attr('transform','translate(' + marginFour.right  + ',' + marginFour.top + ')')
var controls = d3.select('#container4')
                .append('div')
                .attr('id', 'controls');
var xFour = d3.scale.linear()
          .domain([-.5, chart4data['2014Ascending'].length-.5])
          .range([0, width])


// Initial creation of scale
//********************************************************************************************************************************
var yFour = d3.scale.linear()
          .domain([0, 160])
          .range([height, 0])
//********************************************************************************************************************************





var xAxisFour = d3.svg.axis(xFour)
              .orient('bottom')
              .tickFormat(function(d){
                return
              })
              .tickSize(0)


//Initial creation of y Axis
//********************************************************************************************************************************
var yAxisFour = d3.svg.axis(yFour)
              .orient('left')
              .tickFormat(function(n){
                console.log(this)
              })
//********************************************************************************************************************************

              

// var sort2014_btn = controls.append('button')
//                       .html('Sort Low to High by 2014 rate')
//                       .attr('id','sort2014btn')
//                       .classed('btn', true)
// var sortLeast_btn = controls.append('button')
//                       .html('Sort by least improved')
//                       .attr('id','sortleastbtn')
//                       .classed('btn', true)
// var sortMost_btn = controls.append('button')
//                       .html('Sort by most improved')
//                       .attr('id','sortmostbtn')
//                       .classed('btn', true)


function plotAxes(params){//duplicated in ex1

  this.select('.x.axis').remove()
  this.select('.y.axis').remove()

  this.append('g')
      .classed('x axis', true)
      .attr('transform','translate(0,' + height + ')')
      .call(params.axis.x)


//attaching y axis
//********************************************************************************************************************************
  this.append('g')
      .classed('y axis', true)
      .attr('transform','translate(0,0)')
      .call(params.axis.y)
//********************************************************************************************************************************
  // this.select('.y.axis')//Top Label
  //       .append('text')
  //       .style('font-size', '12px')
  //       .style('fill', '#808080')
  //       .attr('x', 150)
  //       .attr('y',-20)
  //       .text('Deaths per 100,000 population')

  // this.select('.y.axis')// old key point
  //     .append('circle')
  //     .attr('r', 4)
  //     .attr('fill', 'rgb(250, 202, 168)')
  //     .attr('cx', 650)
  //     .attr('cy', -30)

  // this.select('.y.axis')// new key point
  //     .append('circle')
  //     .attr('r', 4)
  //     .attr('fill', 'rgb(243, 123, 49)')
  //     .attr('cx', 650)
  //     .attr('cy', -15)

  //  this.select('.y.axis')// old key point
  //     .append('text')
  //     .attr('r', 4)
  //     .attr('x', 660)
  //     .attr('y', -30)
  //     .text('2004')
  //     .classed('chart4keyText', true)

  // this.select('.y.axis')// new key point
  //     .append('text')
  //     .attr('r', 4)
  //     .attr('x', 660)
  //     .attr('y', -15)
  //     .text('2014')
  //     .classed('chart4keyText', true)



//   for(var i = 1; i < 6; i++){
//     d3.select('#note' + i)
//     .remove()
//   }
//   d3.select('.displayFour')//Note
//     .append('text')
//     .attr('id', 'note1')
//     .attr('x',0)
//     .attr('y', height + 50)
//     .classed('alignLeft note', true)
//     .html('Source: European Observatory on Health Systems and Policies (2017). Trends in amenable mortality for selected countries, 2000-2014.')
//   d3.select('.displayFour')//Note
//     .append('text')
//     .attr('id', 'note2')
//     .attr('x',0)
//     .attr('y', height + 60)
//     .classed('alignLeft note', true)
//     .html('Data for 2014 in all countries except Canada (2011), France (2013), Netherlands (2013), New Zealand (2012), Switzerland (2013), UK (2013).')
//   d3.select('.displayFour')//Note
//     .append('text')
//     .attr('id', 'note3')
//     .attr('x',0)
//     .attr('y', height + 70)
//     .classed('alignLeft note', true)
//     .html('Amenable mortality causes based on Nolte & McKee (2004). Mortality and population data derived from WHO mortality files, September 2016;')
//   d3.select('.displayFour')//Note
//     .append('text')
//     .attr('id', 'note4')
//     .attr('x',0)
//     .attr('y', height + 80)
//     .classed('alignLeft note', true)
//     .html('Population data for Canada and the USA derived from the Human Mortality Database. Age-specific rates standardised to the European Standard Population 2013.')
// d3.select('.displayFour')//Note
//     .append('text')
//     .attr('id', 'note5')
//     .attr('x',0)
//     .attr('y', height + 90)
//     .classed('alignLeft note', true)
//     .html('Contact: Marina.Karanikolos@lshtm.ac.uk')
}

function plotLines(params){
  //enter
  this.selectAll('.bar')
      .data(params.data)
      .enter()
        .append('rect')
        .classed('bar', true)
        .attr('id', function(d){
          return d.country + 'bar';
        })
  //update
  this.selectAll('.bar')
      .transition()
      .duration(500)
      .attr('x', function(d,i){
        return xFour(d.rank - 1)
      })
      .attr('y', function(d,i){
        return yFour(d[params.year])
      })
      .attr('width', 1)
      .attr('height', function(d,i){
        return height - yFour(d[params.year])
      })
  //exit
  this.selectAll('.bar')
      .data(params.data)
      .exit()
      .remove();
}

// function infoBox(d){
//   this.append('rect')
//       .attr('x', function(){
//         return xFour(d.rank - 1) - 35;
//       })
//       .attr('y', function(){
//         return yFour(d['2004']) - 55
//       })
//       .attr('width', 70)      
//       .attr('height', 45)
//       .attr('fill', 'white') 
//       .attr('stroke', '#808080')
//       .attr('rx', 5)
//       .attr('id', d.country + 'InfoBox')
//       .classed('infoBox', true)

//   this.append('text')// text top line
//       .attr('x', function(){
//         return xFour(d.rank - 1) - 28;
//       })
//       .attr('y', function(){
//         return yFour(d['2004']) - 38;
//       })
//       .attr('id', d.country + 'OldInfoText')
//       .classed('info', true)
//       .text(function(){
//         return (Math.round(d['2004'] - d['2014']) + ' fewer')
//       })
//   this.append('text')// text bottom line
//       .attr('x', function(){
//         return xFour(d.rank - 1) - 28;
//       })
//       .attr('y', function(){
//         return yFour(d['2004']) - 18;
//       })
//       .attr('id', d.country + 'NewInfoText')
//       .classed('info', true)
//       .text('deaths')
// }

// function removeChart4InfoBox(d){
//     this.select('#' + d.country + 'InfoBox')
//         .remove()
//     this.select('#' + d.country + 'OldInfoText')
//         .remove()
//     this.select('#' + d.country + 'NewInfoText')
//         .remove()
//     this.select('#' + d.country + 'OldInfoNumber')
//         .remove()
//     this.select('#' + d.country + 'NewInfoNumber')
//         .remove()
// }


function plotPoints(params){
  //enter
  this.selectAll('.'+params.class)
      .data(params.data)
      .enter()
          .append('circle')
          .classed(params.class, true)
          // .on('mouseenter', function(d){
          //   infoBox.call(chartFour, d)
          // })
          // .on('mouseleave', function(d){
          //   removeChart4InfoBox.call(chartFour, d)
          // })
  this.selectAll('.label')
      .data(params.data)
      .enter()
          .append('text')
          .classed('label', true)
          // .on('mouseenter', function(d){
          //   infoBox.call(chartFour, d)
          // })
          // .on('mouseleave', function(d){
          //   removeChart4InfoBox.call(chartFour, d)
          // })

  //update
  this.selectAll('.' + params.class)
      .transition()
      .duration(500)
      .attr('r', 4)
      .attr('cx', function(d,i){
        return xFour(d.rank - 1)
      })
      .attr('cy', function(d,i){
        return yFour(d[params.year])
      })
  this.selectAll('.label')
      .transition()
      .duration(500)
      .attr('x', function(d){
        return xFour(d.rank - 1) - (d.country.length * 2.5)
      })
      .attr('y', height + 15)
      .attr('fill', 'black')
      .text(function(d, i){
        return d.country
      })
  //exit
  this.selectAll('.' + params.class)
      .data(params.data)//TODO factor this and following two lines into single function
      .exit()
      .remove();
  this.selectAll('.label')
      .data(params.data)
      .exit()
      .remove()
}

// sort2014_btn.on('click', function(){
//   plot(chart4data['2014Ascending']);
// })

// sortLeast_btn.on('click', function(){
//   plot(chart4data['diffLeast']);
// })

// sortMost_btn.on('click', function(){
//   plot(chart4data['diffMost']);
// })

plotAxes.call(chartFour, {
  axis: {
    x: xAxisFour,
    y: yAxisFour
  }
})

function plot(data) {
  plotLines.call(chartFour,{
    data: data,
    year: '2004'
  })

  plotPoints.call(chartFour, {
    data: data,
    year: '2004',
    class: 'oldPoints'
  })

  plotPoints.call(chartFour, {
    data: data,
    year: '2014',
    class: 'newPoints'
  })
}

function resize4(params){
  w = window.outerWidth - 50;
  h = w * .625 - 50;

  //*************************  Recreating Scales/Axes with window size  ***********************************************


  width = w - marginFour.left - marginFour.right;
  height = h - marginFour.top - marginFour.bottom;

  xFour = d3.scale.linear()
        .domain([-.5, chart4data['2014Ascending'].length-.5])
        .range([0, width])

//********************************************************************************************************************************
  yFour = d3.scale.linear()
        .domain([0, 160])
        .range([height, 0])
//********************************************************************************************************************************

  xAxisFour = d3.svg.axis(xFour)
                .orient('bottom')
                .tickFormat(function(d){
                  return
                })
                .tickSize(0)

//********************************************************************************************************************************
  yAxisFour = d3.svg.axis(yFour)
            .orient('left')
            .tickSize(0)
//********************************************************************************************************************************


  d3.select(this.node().parentNode)//resize SVG element
        .attr('height', h + 50)
        .attr('width', w)

  // this.selectAll('g')//remove axes
  //     .remove();
  // d3.selectAll('.chart4keyText')
  //     .remove();
  // this.selectAll('chart4keyText')
  //     .remove();  

  plotAxes.call(chartFour, {
    axis: {
      x: xAxisFour,
      y: yAxisFour
    }
  })

  plot(chart4data['2014Ascending'])

}

resize4.call(chartFour);

window.addEventListener('resize', function(){
  resize4.call(chart)
})