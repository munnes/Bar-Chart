
const svg=d3.select('svg');
const height= +svg.attr('height');
const width =+svg.attr('width');
const margin={top:20,right:10,bottom:10,left:15};
const tParser = d3.timeParse("%Y-%m-%d")
const parseYear=d3.timeParse("%Y")
svg.append("text")
     .attr('x',width/2)
     .attr('y',margin.top+10)
     .text('United States GDP')
     .attr('id','title');

/*load data */
let  xArray=[];
let  yArray=[];
let  xMin;
let  xMax;
let  yMin;
let  yMax;
let data=[];
let m;
const innerHeight = height - margin.top - margin.bottom;
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
 .then(response=>response.json())
 .then(d=>
     {
     let ddata=d.data

         for(let i=0;i<ddata.length;i++ ){
          xArray.push(+d3.timeFormat("%Y")(tParser(ddata[i][0])));
          yArray.push(+ddata[i][1]);   
          m=+d3.timeFormat("%m")(tParser(ddata[i][0]));
          data.push([xArray[i],yArray[i],m])
               }      
     xArray.push(2016)
        xMin=d3.min(xArray);
        xMax=d3.max(xArray);
        yMin=d3.min(yArray);
        yMax=d3.max(yArray);
      
render(data)// should be here to work with the above values
      
     }
 )
 const render=(data)=>{
  
      /* x-axis*/
let xScale = d3.scaleLinear()
     .domain([xMin, xMax])
     .range([0, width - 100]);

     /*y-axis */
let yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height-110, 0]);
let y_axis = d3.axisLeft()
        .scale(yScale);
    svg.append("g")
       .attr('id','y-axis')
       .attr("transform", "translate(50, 10)")
       .call(y_axis)
       .attr('class','tick');

let gBar=svg.selectAll('g')
.enter()
.append('g')
.data(data);

 const rectBar= gBar
     .enter()
     .append('rect')
          .attr("x",d=>xScale(d[0])+50+d[2])
          .attr("y",d=>yScale(d[1]))
          .attr("width",5)
          .attr("height",d=>height-100-yScale(d[1]))
          .attr('class','bar')
          .attr('data-date',d=>d[0])
          .attr('data-gdp',d=>d[1]);

gBar
.merge(rectBar)
      .append('title')
      .text(d=>{ let txt='\n$ '+d[1].toLocaleString() +' Billion';
          return(    d[2]===1? d[0]+ ' Q1'+txt
          :d[2]===4? d[0]+' Q2'+txt
          :d[2]===7? d[0]+' Q3'+txt
          :d[0]+' Q4'+txt)}) 
      .attr('data-date',d=>d[0])
      .attr('id','tooltip');

    // to align over the shape
      let xAxis=d3.axisBottom(xScale)
     .tickFormat(d3.format("d"));// will remove coma from years
svg.append('g')
     .attr('id','x-axis')
     .attr('transform',`translate(50,${height-100})`)
     .call(xAxis)
     .attr('class','tick');
  // y-text
  svg.append('text')
     .attr('x',-innerHeight/2)
     .attr('y',-99)
     .text('Gross Domestic Product')
     .attr("transform", `translate(180,-70)rotate(-90)`)
     .attr('text-anchor', 'middle')
     .attr('id','y-txt')
 }









 
  
 
     
      
 