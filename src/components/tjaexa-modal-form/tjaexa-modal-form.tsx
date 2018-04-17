import { Component, Element } from '@stencil/core';

@Component({
  tag: 'tjaexa-modal-form',
  styleUrl: 'tjaexa-modal-form.scss',
})
export class ModalForm {
  //
  @Element() el: any;

  dismiss(data?: any) {
    // dismiss this modal and pass back data
    (this.el.closest('ion-modal') as any).dismiss(data);
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    //    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss({ ok: true });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.dismiss()}>Cancel</ion-button>
          </ion-buttons>

          <ion-title>Modal Form</ion-title>

          <ion-buttons slot="end">
            <ion-button onClick={() => this.applyFilters()} strong>
              Done
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content />,
    ];
  }
}
