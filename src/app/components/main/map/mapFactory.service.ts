import {Injectable} from "@angular/core";
import { resolve } from "url";
import { rejects } from "assert";

declare let google: any;

@Injectable()

export default class MapFactory {
  public minZoomLvl;
  public mapStyles;
  public labMarker;
  public getCrs;

  constructor() {
    this.minZoomLvl = 3;
    //Map Style Array
    //Adding options to the map
    //Add the main map defaults for use with the
    //Angular Maps Directive
    //Map option for all the minimaps
    //currently these maps are comments out

    this.getCrs = function(crs) {
      return crs;
    }

    this.labMarker = {
      url: this.getIconPath( 'lab'  ),
      scaledSize: {
        width: 22,
        height: 22
      }
    };

    this.mapStyles = [
      {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#444444' }]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'off' }, { hue: '#F2EBE1' }]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#ECEDE5' }]
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi.business',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi.business',
        elementType: 'labels.text',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi.business',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi.school',
        elementType: 'all',
        stylers: [{ visibility: 'on' }, { hue: '#E8DDBD' }]
      },
      {
        featureType: 'poi.medical',
        elementType: 'all',
        stylers: [{ visibility: 'on' }, { hue: '#EBD2CF' }]
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: [{ saturation: -50 }, { lightness: 30 }]
      },
      {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [{ visibility: 'simplified' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#EF9A9A' }]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#5192cb' }, { visibility: 'on' }]
      }
    ];
    };

    getIconPath( type ) {
      let path = '';
      switch ( type ) {
        case 'Red':
          path = './images/crspinred.png';
          break;
        case 'Pink':
          path = './images/crspinpink.png';
          break;
        case 'unselectedRed':
          path = './images/crspinred1.png';
          break;
        case 'unselectedPink':
          path = './images/crspinpink1.png';
          break;
        case 'profile':
          path = './images/crspinred.png';
          break;
        case 'lab':
          path = './images/crspingreen.png';
          break;
      }
      return path;
    };
};