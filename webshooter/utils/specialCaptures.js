const capture = require('./captureChart');

// IG: Reporte Diario Chile
capture(null, null, 540, 800, 1350, '#faqButton, .quarantineRibbon, .metricCardTooltip');

const mostQueriedCommunes = [
  ['Metropolitana', 'Las Condes'],
  ['Metropolitana', 'Vitacura'],
  ['Metropolitana', 'Ñuñoa'],
  ['Metropolitana', 'Lo Barnechea'],
  ['Metropolitana', 'Providencia'],
  ['Metropolitana', 'Santiago'],
  ['Metropolitana', 'La Reina'],
  ['Metropolitana', 'La Florida'],
  ['Metropolitana', 'Puente Alto'],
  ['Metropolitana', 'Maipú'],
];

mostQueriedCommunes.forEach(([region, commune]) => {
  capture(region, commune, 685, 800, 1300);
});
