import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  imports: [
    CommonModule 
  ],
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.css']
})
export class ResponsablesComponent {
  
  defaultStyleAbraham = {
    'background-color': '#333333', 
    'color': '#ffffff', 
    'transform': 'scale(1)',
    'transition': 'transform 0.3s ease, background-color 0.3s ease'
  };

  defaultStylePepe = {
    'background-color': '#333333',
    'color': '#ffffff',
    'transform': 'scale(1)',
    'transition': 'transform 0.3s ease, background-color 0.3s ease'
  };

  defaultStyleLuis = {
    'background-color': '#333333',
    'color': '#ffffff',
    'transform': 'scale(1)',
    'transition': 'transform 0.3s ease, background-color 0.3s ease'
  };

  hoverStyleAbraham = {
    'background-color': '#f39c12', 
    'color': '#333333',
    'transform': 'scale(1.05)',
    'transition': 'transform 0.3s ease, background-color 0.3s ease'
  };

  hoverStylePepe = {
    'background-color': '#f39c12',
    'color': '#333333',
    'transform': 'scale(1.05)',
    'transition': 'transform 0.3s ease, background-color 0.3s ease'
  };

  hoverStyleLuis = {
    'background-color': '#f39c12',
    'color': '#333333',
    'transform': 'scale(1.05)',
    'transition': 'transform 0.3s ease, background-color 0.3s ease'
  };

  currentStyleAbraham = this.defaultStyleAbraham;
  currentStylePepe = this.defaultStylePepe;
  currentStyleLuis = this.defaultStyleLuis;

  onMouseEnterAbraham() {
    this.currentStyleAbraham = this.hoverStyleAbraham;
  }

  onMouseLeaveAbraham() {
    this.currentStyleAbraham = this.defaultStyleAbraham;
  }

  onMouseEnterPepe() {
    this.currentStylePepe = this.hoverStylePepe;
  }

  onMouseLeavePepe() {
    this.currentStylePepe = this.defaultStylePepe;
  }

  onMouseEnterLuis() {
    this.currentStyleLuis = this.hoverStyleLuis;
  }

  onMouseLeaveLuis() {
    this.currentStyleLuis = this.defaultStyleLuis;
  }
}
