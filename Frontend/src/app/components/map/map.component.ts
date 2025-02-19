import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { GasCondensateField } from '../../models/gas-condensate-field.model';

@Component({
  selector: 'app-map',
  standalone: true, // Mark as standalone
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() fields: GasCondensateField[] = []; // Accept fields as input
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private apiKey: string = 'ab36e3e973eb4f78aff6bf4cd5b681ff';

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.map) {
        this.initMap();
      }
      this.updateMarkers();
    }, 300); // Small delay to ensure the container is fully rendered
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] && this.map) {
      this.updateMarkers();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([23.5880, 58.3829], 12); // Example: Muscat, Oman

    L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${this.apiKey}`, {
      attribution: '&copy; OpenStreetMap contributors &copy; Geoapify',
    }).addTo(this.map);
  }

  private updateMarkers(): void {
    this.clearMarkers();
    const customIcon = L.icon({
      iconUrl: 'oil-well.png', 
      iconSize: [40, 40], // Adjust size as needed
      iconAnchor: [20, 40], // Position correction
      popupAnchor: [0, -40]
    });
    this.fields.forEach((field) => {
      const marker = L.marker([field.latitude, field.longitude],{ icon: customIcon }).addTo(this.map);
      marker.bindPopup(`<b>${field.fieldName}</b><br>Production: ${field.productionRate} barrels/day`);
      this.markers.push(marker);
    });

    // Auto-adjust map bounds to fit all markers
    if (this.fields.length > 0) {
      const bounds = L.latLngBounds(this.fields.map(f => [f.latitude, f.longitude]));
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }
}
