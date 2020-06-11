import { Component, OnInit } from '@angular/core';
import { Panela } from 'src/app/Produccion/models/panela';
import { PanelaService } from 'src/app/services/panela.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';

@Component({
  selector: 'app-produccion-edicion',
  templateUrl: './produccion-edicion.component.html',
  styleUrls: ['./produccion-edicion.component.css']
})
export class ProduccionEdicionComponent implements OnInit {
  panela:Panela ;
  
  constructor(private panelaService: PanelaService, private rutaActiva: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerRuta();
    
  }
  obtenerRuta() {
    const id = this.rutaActiva.snapshot.params.idregistro;
    this.panelaService.getId(id).subscribe(a => {
      if (a != null) {
        this.panela = a;
      }
    });
  }

  update() {
    this.panelaService.put(this.panela).subscribe(a => {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = 'Resultado Operación';
      messageBox.componentInstance.message = 'Actualizado correctamente!';
    });
  }

  delete() {
    this.panelaService.delete(this.panela).subscribe(a => {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = 'Resultado Operación';
      messageBox.componentInstance.message = 'Eliminado correctamente!';
    });
  }
 

}
