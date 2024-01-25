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
  letters = [
    { char: 'S', colored: false },
    { char: 'a', colored: false },
    { char: 'y', colored: false },
    { char: ' ', colored: false },
    { char: 'H', colored: false },
    { char: 'i', colored: false },
    { char: '!', colored: false },
  ];

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
    nameError: false,
    emailError: false,
    messageError: false,
    checkboxError: false,
  };

  sendingEmail: boolean = false;
  emailSent: boolean = false;
  isColored: boolean = false;
  buttonText: string = 'Send Message'; // Deklaration und Initialisierung

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.checkScreenSize();
      this.updateButtonText(window.innerWidth);
    }
  }

  /**
   * Updates the button text based on screen width.
   * @param {number} width - The current width of the window.
   */
  updateButtonText(width: number) {
    this.buttonText = width <= 768 ? 'Say hello ;)' : 'Send Message';
  }

  /**
   * Host listener for window resize events to adjust UI elements accordingly.
   * @param {Event} event - The resize event object.
   */
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

  /**
   * Checks the screen size to toggle the letter case and color.
   */
  changeColor(event: MouseEvent) {
    const element = event.target as HTMLElement;
  }

  /**
   * resets the color of Letters.
   */
  resetColor(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.style.color = '##00bc8f';
  }

  /**
   * Toggles the color state of a specific letter in the 'letters' array.
   * @param {number} index - The index of the letter to toggle.
   */
  toggleColor(index: number) {
    this.letters[index].colored = !this.letters[index].colored;
  }

  /**
   * Checks if the checkbox is checked.
   * @returns {boolean} - True if the checkbox is checked, false otherwise.
   */
  isCheckboxChecked(): boolean {
    if (this.checkBox && this.checkBox.nativeElement) {
      return this.checkBox.nativeElement.checked;
    } else {
      return false;
    }
  }

  /**
   * Validates the form fields and checkbox.
   * @returns {boolean} - True if the form is valid, false otherwise.
   */
  validateForm(): boolean {
    if (!this.isCheckboxChecked()) {
      this.formData.checkboxError = true; // Set error if the checkbox is not checked
      return false; // Exit the method if the checkbox is not checked
    }
    if (
      this.isRightIconPresent(this.nameField.nativeElement) &&
      this.isRightIconPresent(this.emailField.nativeElement) &&
      this.isRightIconPresent(this.messageField.nativeElement) &&
      this.isCheckboxChecked()
    ) {
      return true;
    } else {
      console.log('Not all fields are correctly filled.');
      return false;
    }
  }

  /**
   * Sends the email.
   * @param {HTMLInputElement} nameField - The name field.
   * @param {HTMLInputElement} emailField - The email field.
   */
  async sendEmail(
    nameField: HTMLInputElement,
    emailField: HTMLInputElement,
    messageField: HTMLInputElement
  ) {
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

    setTimeout(() => {
      this.emailSent = false;
    }, 2000);
  }

  /**
   * Handles the form submission and triggers the email sending process.
   */
  async sendMail() {
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let checkBox = this.checkBox.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    if (this.validateForm()) {
      emailField.disabled = true;
      nameField.disabled = true;
      messageField.disabled = true;
      checkBox.disabled = true;
      sendButton.disabled = true;

      await this.sendEmail(nameField, emailField, messageField);

      nameField.disabled = false;
      emailField.disabled = false;
      messageField.disabled = false;
      checkBox.disabled = false;
      sendButton.disabled = false;

      this.resetForm();
    }
  }

  /**
   * Resets the form to its initial state.
   */
  resetForm() {
    this.formData.name = '';
    this.formData.email = '';
    this.formData.message = '';
  }

  /**
   * Handles the focus event on input fields to update styles.
   * @param {HTMLInputElement} inputField - The input field that received focus.
   * @param {HTMLLabelElement} label - The label element associated with the input field.
   */
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

  /**
   * Updates the background of the input field based on its validity.
   * @param {HTMLInputElement} inputField - The input field to update.
   * @param {boolean} isValid - Whether the input field is valid or not.
   */
  updateInputFieldBackground(
    inputField: HTMLInputElement | HTMLTextAreaElement,
    isValid: boolean
  ) {
    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'url(./assets/img/Icons/error.svg) right 25px top 10px no-repeat black';
  }

  /**
   * Updates the label of the input field based on its value.
   * @param {HTMLLabelElement} label - The label to update.
   * @param {string} value - The value of the input field.
   */
  updateLabel(label: HTMLLabelElement, value: string) {
    if (value === '') {
      label.style.top = '50%';
      label.style.fontSize = '16px';
    } else {
      label.style.top = '2px';
      label.style.fontSize = '12px';
    }
  }

  /**
   * Handles the blur event on input fields to validate and update styles.
   * @param {HTMLInputElement} inputField - The input field that lost focus.
   * @param {HTMLLabelElement} label - The label element associated with the input field.
   */
  onBlur(
    inputField: HTMLInputElement | HTMLTextAreaElement,
    label: HTMLLabelElement
  ) {
    let isValid = inputField.value.length >= 3;

    if (inputField.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      isValid = emailRegex.test(inputField.value);
      this.formData.emailError = !isValid;
      this.updateInputFieldBackground(inputField, isValid);
      this.updateLabel(label, inputField.value);
    } else if (inputField.name === 'name') {
      this.formData.nameError = !isValid;
      this.updateInputFieldBackground(inputField, isValid);
      this.updateLabel(label, inputField.value);
    } else if (inputField.name === 'message') {
      this.formData.messageError = !isValid;
      this.updateInputFieldBackground(inputField, isValid);
      if (inputField.value !== '') {
        label.style.top = '2px';
        label.style.fontSize = '12px';
      } else {
        label.style.top = '10%';
        label.style.fontSize = '18px';
      }
    }
  }

  /**
   * Handles the input event on the email field to validate the email address.
   * @param {HTMLInputElement} inputField - The email input field.
   */
  onEmailInput(inputField: HTMLInputElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputField.value);
    this.formData.emailError = !isValid;

   
    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'black';
  }

  /**
   * Handles the input event on the name field to validate the name.
   * @param {HTMLInputElement} inputField - The name input field.
   */
  onNameInput(inputField: HTMLInputElement) {
    const isValid = inputField.value.length > 2;
    this.formData.nameError = !isValid;

    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'black';
  }

  /**
   * Handles the input event on the message field to validate the message.
   * @param {HTMLTextAreaElement} inputField - The message textarea field.
   */
  onMessageInput(inputField: HTMLTextAreaElement) {
    const isValid = inputField.value.length > 2;
    this.formData.messageError = !isValid;

    inputField.style.background = isValid
      ? 'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black'
      : 'black';
  }

  /**
   * Handles changes to the checkbox to reset the checkbox error state.
   */
  onCheckboxChange() {
    this.formData.checkboxError = false; // Fehler zurücksetzen, wenn die Checkbox geändert wird
  }

  /**
   * Checks if the right icon is present in the background image of an input field.
   * @returns {boolean} - True if the right icon is present, false otherwise.
   */
  isRightIconPresent(
    inputField: HTMLInputElement | HTMLTextAreaElement
  ): boolean {
    // Überprüfung, ob das Hintergrundbild 'right.svg' ist
    return window
      .getComputedStyle(inputField)
      .backgroundImage.includes('right.svg');
  }

  /**
   * Sets the error state for the form data based on the input field name and error state.
   * @param {HTMLInputElement | HTMLTextAreaElement} inputField - The input field to set the error state for.
   * @param {boolean} isError - The error state to set.
   */
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

  /**
   * Updates the style of the input field based on its content length.
   * @param {HTMLInputElement | HTMLTextAreaElement} inputField - The input field to update the style for.
   */
  updateFieldStyle(inputField: HTMLInputElement | HTMLTextAreaElement) {
    if (inputField.name === 'email') {
    } else {
      if (inputField.value.length >= 3) {
        inputField.style.background =
          'url(./assets/img/Icons/right.svg) right 25px top 10px no-repeat black';
      } else {
        inputField.style.background = 'black';
      }
    }
  }

  /**
   * Checks if the form is valid by ensuring all fields are filled and the checkbox is checked.
   */
  isFormValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return (
      this.formData.name &&
      this.formData.email &&
      this.formData.message &&
      this.isCheckboxChecked() &&
      emailRegex.test(this.formData.email) 
    );
  }
}
