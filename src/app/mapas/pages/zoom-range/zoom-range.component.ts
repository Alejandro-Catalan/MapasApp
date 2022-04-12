import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector   : 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles     : [
    ` 
  .mapa-container{

      height: 100%;
      width : 100%;
  }
  
  .row{

    background-color: white;
    border-radius   : 5px;
    bottom          : 50px;
    left            : 50px;
    padding         : 10px;
    position        : fixed;
    z-index         : 999;
    width           : 400px;

  }

  `
  ]
})
export class ZoomRangeComponent implements OnDestroy, AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!                      : mapboxgl.Map;
  zoomLevel                  : number = 10;
  center                     : [number, number] = [ -70.54584711897247, -33.42211358157754 ];

  constructor() { }


  ngOnDestroy(): void {
      this.mapa.off('zoom', () => {});
      this.mapa.off('zoomend', () => {});
      this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {    



    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style    : 'mapbox://styles/mapbox/streets-v11',
    center   : this.center,  
    zoom     : this.zoomLevel
    });

    //Estos de aquí abajo son Listeners

    //Nivel de Zoom

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    //Máximo de Zoom

    this.mapa.on('zoomend', (ev) => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
    });

    //Movimiento del mapa

    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat} = target.getCenter();
      this.center = [lng, lat];
      
    })


  }

  

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number(valor) );
  }
    
}