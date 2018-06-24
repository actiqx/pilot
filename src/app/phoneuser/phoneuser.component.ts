import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-phoneuser',
  templateUrl: './phoneuser.component.html',
  styleUrls: ['./phoneuser.component.css']
})
export class PhoneuserComponent {
  title = 'Esipotech Pilot';
  lat = 19.432608;
  lng = -99.133209;
  public dir = undefined;
  locationChoosen = false;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
