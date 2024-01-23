import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '@angular/router';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent implements OnInit {
  //////////////////////////COLORCHANGE ANIMATIAN///////////////////////////////////////////////
  //////////////////////////COLORCHANGE ANIMATIAN///////////////////////////////////////////////
  letters = [
    { char: 'S', colored: false },
    { char: 'a', colored: false },
    { char: 'y', colored: false },
    { char: ' ', colored: false },
    { char: 'H', colored: false },
    { char: 'i', colored: false },
    { char: '!', colored: false },
  ];

  isColored: boolean = false;
  buttonText: string = 'Send Message'; // Deklaration und Initialisierung

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.checkScreenSize();
      this.updateButtonText(window.innerWidth);
    }
  }

  updateButtonText(width: number) {
    this.buttonText = width <= 768 ? 'Say hello ;)' : 'Send Message';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
    this.updateButtonText(window.innerWidth);
  }

  checkScreenSize() {
    if (window.innerWidth <= 650) {
      this.letters[4].char = 'h'; // Ändere 'H' zu 'h'
      this.letters.forEach((letter) => (letter.colored = true)); // Ändere alle Buchstaben zu grau
    } else {
      this.letters[4].char = 'H'; // Zurück zu 'H'
      this.letters.forEach((letter) => (letter.colored = false)); // Zurück zu Weiß
    }
  }

  changeColor(event: MouseEvent) {
    const element = event.target as HTMLElement;
    // Hier können Sie die Farbe basierend auf der Position des Mauszeigers ändeng build
  }

  resetColor(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.style.color = '##00bc8f'; // Setzt die Farbe zurück
  }

  toggleColor(index: number) {
    this.letters[index].colored = !this.letters[index].colored;
  }

  //////////////////////////SEND MAIL///////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  sendingEmail: boolean = false; // Eigenschaft zum Anzeigen der Nachricht "E-Mail wird gesendet"
  emailSent: boolean = false; // Eigenschaft zum Anzeigen der Nachricht "E-Mail wurde erfolgreich verschickt"

  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('checkBox') checkBox!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;

  formData = {
    name: '',
    email: '',
    message: '',
    nameError: false, // Fehler-Flag für den Namen
    emailError: false, // Fehler-Flag für die E-Mail
    messageError: false, // Fehler-Flag für die Nachricht
    checkboxError: false, // Fehler-Flag für die Nachricht
  };

  isCheckboxChecked(): boolean {
    if (this.checkBox && this.checkBox.nativeElement) {
      return this.checkBox.nativeElement.checked;
    } else {
      return false;
    }
  }

  async sendMail() {
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let checkBox = this.checkBox.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    // Überprüfen, ob alle Felder das richtige Bild haben

    if (!this.isCheckboxChecked()) {
      this.formData.checkboxError = true; // Fehler setzen, wenn die Checkbox nicht angekreuzt ist
      return; // Beenden der Methode, wenn die Checkbox nicht angekreuzt ist
    }
    if (
      this.isRightIconPresent(this.nameField.nativeElement) &&
      this.isRightIconPresent(this.emailField.nativeElement) &&
      this.isRightIconPresent(this.messageField.nativeElement) &&
      this.isCheckboxChecked()
    ) {
      emailField.disabled = true;
      nameField.disabled = true;
      messageField.disabled = true;
      checkBox.disabled = true;
      sendButton.disabled = true;
      let fd = new FormData();
      fd.append('name', nameField.value);
      fd.append('email', emailField.value);
      fd.append('message', messageField.value);
      await fetch('https://sebastianbrosda.de/send_mail/send_mail.php', {
        method: 'POST',
        body: fd,
      });

      this.sendingEmail = false;
      this.emailSent = true;

      // Nachricht nach 5 Sekunden ausblenden (5000 Millisekunden)
      setTimeout(() => {
        this.emailSent = false;
      }, 2000);

      // Text anzeigen Nachricht gesendet
      nameField.disabled = false;
      emailField.disabled = false;
      messageField.disabled = false;
      checkBox.disabled = false;
      sendButton.disabled = false;

      this.resetForm();
    } else {
      // Optionale Fehlerbehandlung, wenn nicht alle Felder das 'right.svg' Bild haben
      console.log('Nicht alle Felder sind korrekt ausgefüllt.');
    }
    // Nachricht, dass gesendet wird
  }

  // Funktion zum Zurücksetzen des Formulars
  resetForm() {
    this.formData.name = '';
    this.formData.email = '';
    this.formData.message = '';
  }

  onFocus(
    inputField: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement
  ) {
    this.updateFieldStyle(inputField);
    if (inputField.value === '') {
      // Wenn das Feld leer ist und den Fokus erhält, verschiebe das Label nach oben
      label.style.top = '2px';
      label.style.fontSize = '12px';
    }
  }

  onBlur(
    inputField: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement
  ) {
    let isValid = inputField.value.length >= 3;

    if (inputField.name === 'email') {
      // Spezielle Logik für das E-Mail-Feld
      isValid = inputField.value.includes('@');
      this.formData.emailError = !isValid;
      inputField.style.background = isValid
        ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
        : 'url(./assets/img/Icons/error.svg) right 25px top 10px no-repeat black';
      if (inputField.value === '') {
        label.style.top = '50%';
        label.style.fontSize = '16px';
      } else {
        label.style.top = '2px';
        label.style.fontSize = '12px';
      }
    } else if (inputField.name === 'name') {
      // Logik für das Namensfeld
      this.formData.nameError = !isValid;
      inputField.style.background = !isValid
        ? 'url(./assets/img/Icons/error.svg) right 25px top 10px no-repeat black'
        : 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black';
      if (inputField.value === '') {
        label.style.top = '50%';
        label.style.fontSize = '16px';
      } else {
        label.style.top = '2px';
        label.style.fontSize = '12px';
      }
    } else if (inputField.name === 'message') {
      // Spezielle Logik für das Nachrichtenfeld
      this.formData.messageError = !isValid;
      inputField.style.background = !isValid
        ? 'url(./assets/img/Icons/error.svg) right 25px top 10px no-repeat black'
        : 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black';
      if (inputField.value !== '') {
        label.style.top = '2px'; // Angepasste Position für nicht leeres Nachrichtenfeld
        label.style.fontSize = '12px';
      } else {
        label.style.top = '10%'; // Angepasste Position für leeres Nachrichtenfeld
        label.style.fontSize = '18px';
      }
    }
  }

  onEmailInput(inputField: HTMLInputElement) {
    const isValid = inputField.value.includes('@');
    this.formData.emailError = !isValid;

    // Aktualisiere das Hintergrundbild basierend auf der Gültigkeit
    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'black';
  }

  onNameInput(inputField: HTMLInputElement) {
    const isValid = inputField.value.length > 2;
    this.formData.nameError = !isValid;

    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'black';
  }

  onMessageInput(inputField: HTMLTextAreaElement) {
    const isValid = inputField.value.length > 2;
    this.formData.messageError = !isValid;

    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'black';
  }

  onCheckboxChange() {
    this.formData.checkboxError = false; // Fehler zurücksetzen, wenn die Checkbox geändert wird
  }

  isRightIconPresent(
    inputField: HTMLInputElement | HTMLTextAreaElement
  ): boolean {
    // Überprüfung, ob das Hintergrundbild 'right.svg' ist
    return window
      .getComputedStyle(inputField)
      .backgroundImage.includes('right.svg');
  }

  setFormDataError(
    inputField: HTMLInputElement | HTMLTextAreaElement,
    isError: boolean
  ) {
    if (inputField.name === 'name') {
      this.formData.nameError = isError;
    } else if (inputField.name === 'email') {
      this.formData.emailError = isError;
    } else if (inputField.name === 'message') {
      this.formData.messageError = isError;
    }
  }

  updateFieldStyle(inputField: HTMLInputElement | HTMLTextAreaElement) {
    if (inputField.name === 'email') {
      // Logik für das E-Mail-Feld
      // ... (wie bereits definiert)
    } else {
      // Logik für das Namens- und Nachrichtenfeld
      if (inputField.value.length >= 3) {
        inputField.style.background =
          'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black';
      } else {
        inputField.style.background = 'black';
      }
    }
  }

  isFormValid() {
    return (
      this.formData.name &&
      this.formData.email &&
      this.formData.message &&
      this.isCheckboxChecked()
    );
  }
}
