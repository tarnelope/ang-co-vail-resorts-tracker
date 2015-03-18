'use strict';

/**
 * Map Service
 */
angular
	.module('coResortTrackerApp')
	.factory('MapService', ['DailyResortStatus',
		function(DailyResortStatus) {

			var map;
			var openRuns = {};
			
			var styles = {
				'Neutral': [new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'rgba(0, 0, 0, 0.2)',
						width: 2
					})
				})],
				'Easy': [new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'green',
						width: 3
					})
				})],
				'Intermediate': [new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'blue',
						width: 3
					})
				})],
				'Advanced': [new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'black',
						width: 3
					})
				})],
				'Closed': [new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'red',
						width: 3
					})
				})],
				'Unknown': [new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'purple',
						width: 3
					})
				})]
			};
			
			var styleFunction = function(feature) {
				if (feature.getProperties().aerialway !== 'chair_lift') {
					var trailName = feature.getProperties().name;
					if (trailName !== undefined && trailName !== null) trailName = trailName.toUpperCase();
					// console.log('openRuns[trailName]: ' + openRuns[trailName] + ' with trailName: ' + trailName);
					if (openRuns[trailName] === undefined || openRuns[trailName] === null) { //Run not open
						return styles.Unknown;
					} else {
						var trailObj = openRuns[trailName];

						if (trailObj.status === 'open') {
							switch (trailObj.difficulty) {
								case 'easy':
									return styles.Easy;
								case 'intermediate':
									return styles.Intermediate;
								case 'advanced':
									return styles.Advanced;
								default:
									return styles.Neutral;
							}
						} else {
							return styles.Closed;
						}
					}
				} else {
					return styles.Neutral;
				}
			};
			
			var CreateMap = {
				updateMap: function(resort) {

					resort = resort.toLowerCase().replace(/\s/g, '');

					var mapCenter = [];

					switch (resort) {
						case 'keystone':
							mapCenter = [-105.9137, 39.5658];
							break;
						case 'beavercreek':
							mapCenter = [-106.5179, 39.5826];
							break;
						case 'vail':
							mapCenter = [-106.3454, 39.6069];
							break;
						case 'breckenridge':
							mapCenter = [-106.0676, 39.4688];
							break;
					}
					
					var vectorSource = new ol.source.GeoJSON({
								projection: 'EPSG:3857',
								url: '../data/' + resort + 'Key.geojson'
							}); 

					DailyResortStatus.getResortStatus(resort)
						.then(function(data) {
							for (var i = 1; i < data.data.length; i++) {
								var trail = data.data[i];

								var trailData = {
									'difficulty': trail.trailDifficulty,
									'status': trail.trailStatus
								};
								openRuns[trail.trailName] = trailData;
							}
						});

					map.getView().setCenter(ol.proj.transform(mapCenter, 'EPSG:4326', 'EPSG:3857'));
					map.getView().setZoom(12);
					

					var vectorLayer = new ol.layer.Vector({
						source: vectorSource,
						style: styleFunction
					});

					map.addLayer(vectorLayer);
				},
				initMap: function(resort) {
					if (!ol) {
						return {};
					}
					resort = resort.toLowerCase().replace(/\s/g, '');
					var keyName = '../data/'+resort+'Key.geojson';
					var mapCenter = [-105.9137, 39.5658];
					DailyResortStatus.getResortStatus(resort)
						.then(function(data) {
							for (var i = 1; i < data.data.length; i++) {
								var trail = data.data[i];

								var trailData = {
									'difficulty': trail.trailDifficulty,
									'status': trail.trailStatus
								};
								openRuns[trail.trailName] = trailData;
							}
						});

					var selectClick = new ol.interaction.Select({
						condition: ol.events.condition.click
					});

					var vectorSource = new ol.source.GeoJSON({
						projection: 'EPSG:3857',
						url: keyName
					});

					var vectorLayer = new ol.layer.Vector({
						source: vectorSource,
						style: styleFunction
					});

					/**
					 * Elements that make up the popup.
					 */
					var container = document.getElementById('popup');
					var content = document.getElementById('popup-content');
					var closer = document.getElementById('popup-closer');

					/**
					 * Add a click handler to hide the popup.
					 * @return {boolean} Don't follow the href.
					 */
					closer.onclick = function() {
						overlay.setPosition(undefined);
						closer.blur();
						return false;
					};

					/**
					 * Create an overlay to anchor the popup to the map.
					 */
					var overlay = new ol.Overlay({
						element: container
					});

					// Create a map
					map = new ol.Map({
						overlays: [overlay],
						layers: [
							new ol.layer.Tile({
								source: new ol.source.MapQuest({
									layer: 'osm'
								})
							}),
							vectorLayer
						],
						view: new ol.View({
							center: ol.proj.transform(mapCenter, 'EPSG:4326', 'EPSG:3857'),
							zoom: 12
						}),
						target: 'map'
					});

					map.addInteraction(selectClick);

					map.on('click', function(evt) {
						var coordinate = evt.coordinate;
						var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
							return feature;
						});
						if (feature !== undefined && feature !== null) {
							var trailName = feature.get('name').toUpperCase();
							var trailStatus = openRuns[trailName] !== undefined ? openRuns[trailName].status : 'Sorry, either the run is not mapped in OpenStreetMaps or not listed on the resort&#39;s website.';
							content.innerHTML = '<p>' + trailName + '</p><p>' + feature.get('piste:difficulty').substr(0, 1).toUpperCase() + feature.get('piste:difficulty').substr(1) + '</p><p>' + trailStatus;
							overlay.setPosition(coordinate);
						}
					});
				}
			};
			return CreateMap;
		}
	]);
