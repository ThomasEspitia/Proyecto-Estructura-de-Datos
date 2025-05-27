import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function GraphVisualizer({ nodes, edges }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!nodes.length || !svgRef.current) return;

    const width = 1600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Limpiar el SVG antes de redibujar
    svg.selectAll('*').remove();

    // Convertir las cadenas de texto en objetos para D3
    const formattedNodes = nodes.map((word, index) => ({
      id: word,
      word: word,
      isStart: index === 0,
      isEnd: index === nodes.length - 1
    }));

    // Formatear las aristas para que usen los objetos
    const formattedEdges = edges.map(edge => ({
      source: formattedNodes.find(node => node.id === edge.from) || edge.from,
      target: formattedNodes.find(node => node.id === edge.to) || edge.to
    }));

    // Crear una simulación de fuerzas
    const simulation = d3.forceSimulation(formattedNodes)
      .force('charge', d3.forceManyBody().strength(-10))
      .force('center', d3.forceCenter(width / 10, height / 2.5))
      .force('link', d3.forceLink(formattedEdges).id(d => d.id).distance(20))
      .force('collision', d3.forceCollide().radius(30));

    // Dibujar las aristas
    const link = svg.append('g')
      .selectAll('line')
      .data(formattedEdges)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Dibujar los nodos
    const node = svg.append('g')
      .selectAll('g')
      .data(formattedNodes)
      .enter().append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('circle')
      .attr('r', 20)
      .attr('fill', d => {
        if (d.isStart) return '#4CAF50'; // Primer nodo (verde)
        if (d.isEnd) return '#F44336'; // Último nodo (rojo)
        return '#2196F3'; // Nodos intermedios (azul)
      });

    node.append('text')
      .text(d => d.word)
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', 'white')
      .style('font-size', '10px');

    // Actualizar posiciones en cada tick de la simulación
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, edges]);

  return (
    <div className="graph-visualizer">
      <h2>Visualización del Grafo</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GraphVisualizer;