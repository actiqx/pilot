import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-phoneuser',
  templateUrl: './phoneuser.component.html',
  styleUrls: ['./phoneuser.component.css']
})
export class PhoneuserComponent implements OnInit {
  title = 'Esipotech Pilot';

  // Map Variable
  lat = 19.432608;
  lng = -99.133209;
  marker: {};
  origin: {};
  destination: {};
  waypoints = [];
  public dir = undefined;
  locationChoosen = false;
  modalRef: BsModalRef;
  // FeedBack Variable
  status = [];
  selectedStatus = {};
  showMotive: boolean;
  constructor(
    private modalService: BsModalService,
    private alertify: AlertifyService
  ) {}
  ngOnInit(): void {
    this.marker = {
      lat: 19.381306,
      lng: -99.101111,
      iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
    };
    this.origin = {
      lat: 19.3898194,
      lng: -99.2540159
    };
    this.destination = {
      lat: 19.452686,
      lng: -99.057145
    };
    this.waypoints = [
      {
        location: { lat: 19.358079, lng: -99.154452 },
        stopover: true
      },
      {
        location: { lat: 19.363909, lng: -99.129046 },
        stopover: true
      },
      {
        location: { lat: 19.424791, lng: -99.093341 },
        stopover: true
      }
    ];
    this.status = [
      { id: 1, status_type: 'Success' },
      { id: 2, status_type: 'Failure' }
    ];
    this.showMotive = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  submitFeedBack() {
    this.alertify.success('FeedBack Submitted Successfully');
    this.modalRef.hide();
  }
  onStatusTypeChange($event) {
    this.selectedStatus = $event;
    if (this.selectedStatus[0].id === 2) {
      this.showMotive = true;
    }
  }
}
