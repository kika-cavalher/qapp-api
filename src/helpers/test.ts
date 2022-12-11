import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

let openSansAdded = false;

const myDom = {
  polygons: {
    text: document.getElementById("polygons-text"),
    align: document.getElementById("polygons-align"),
    baseline: document.getElementById("polygons-baseline"),
    rotation: document.getElementById("polygons-rotation"),
    font: document.getElementById("polygons-font"),
    weight: document.getElementById("polygons-weight"),
    placement: document.getElementById("polygons-placement"),
    maxangle: document.getElementById("polygons-maxangle"),
    overflow: document.getElementById("polygons-overflow"),
    size: document.getElementById("polygons-size"),
    height: document.getElementById("polygons-height"),
    offsetX: document.getElementById("polygons-offset-x"),
    offsetY: document.getElementById("polygons-offset-y"),
    color: document.getElementById("polygons-color"),
    outline: document.getElementById("polygons-outline"),
    outlineWidth: document.getElementById("polygons-outline-width"),
    maxreso: document.getElementById("polygons-maxreso"),
  },
};

const getText = function (feature, resolution, dom) {
  const type = dom.text.value;
  const maxResolution = dom.maxreso.value;
  let text = feature.get("name");

  if (resolution > maxResolution) {
    text = "";
  } else if (type == "hide") {
    text = "";
  } else if (type == "shorten") {
    text = text.trunc(12);
  } else if (
    type == "wrap" &&
    (!dom.placement || dom.placement.value != "line")
  ) {
    text = stringDivider(text, 16, "\n");
  }

  return text;
};

const createTextStyle = function (feature, resolution, dom) {
  const align = dom.align.value;
  const baseline = dom.baseline.value;
  const size = dom.size.value;
  const height = dom.height.value;
  const offsetX = parseInt(dom.offsetX.value, 10);
  const offsetY = parseInt(dom.offsetY.value, 10);
  const weight = dom.weight.value;
  const placement = dom.placement ? dom.placement.value : undefined;
  const maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
  const overflow = dom.overflow ? dom.overflow.value == "true" : undefined;
  const rotation = parseFloat(dom.rotation.value);
  const font = weight + " " + size + "/" + height + " " + dom.font.value;
  const fillColor = dom.color.value;
  const outlineColor = dom.outline.value;
  const outlineWidth = parseInt(dom.outlineWidth.value, 10);

  return new Text({
    textAlign: align == "" ? undefined : align,
    textBaseline: Number(baseline),
    font: font,
    text: getText(feature, resolution, dom),
    fill: new Fill({ color: fillColor }),
    stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
    offsetX: offsetX,
    offsetY: offsetY,
    placement: placement,
    maxAngle: maxAngle,
    overflow: overflow,
    rotation: rotation,
  });
};

// Polygons
function polygonStyleFunction(feature, resolution) {
  return new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
    text: createTextStyle(feature, resolution, myDom.polygons),
  });
}

const vectorPolygons = new VectorLayer({
  source: new VectorSource({
    url: "data/geojson/polygon-samples.geojson",
    format: new GeoJSON(),
  }),
  style: polygonStyleFunction,
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorPolygons,
    vectorPoints,
  ],
  target: "map",
  view: new View({
    center: [-8161939, 6095025],
    zoom: 8,
  }),
});

document
  .getElementById("refresh-polygons")
  .addEventListener("click", function () {
    vectorPolygons.setStyle(polygonStyleFunction);
  });

/**
 * @param {number} n The max number of characters to keep.
 * @return {string} Truncated string.
 */
String.prototype.trunc =
  String.prototype.trunc ||
  function (n) {
    return this.length > n ? this.substr(0, n - 1) + "..." : this.substr(0);
  };

// https://stackoverflow.com/questions/14484787/wrap-text-in-javascript
function stringDivider(str, width, spaceReplacer) {
  if (str.length > width) {
    let p = width;
    while (p > 0 && str[p] != " " && str[p] != "-") {
      p--;
    }
    if (p > 0) {
      let left;
      if (str.substring(p, p + 1) == "-") {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      const right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}
