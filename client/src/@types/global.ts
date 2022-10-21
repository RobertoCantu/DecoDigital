declare global {
    interface Window {
      recaptchaVerifier: any;
      confirmationResult: any;
      api : string;
      userToken: string;
    }
}

window.api = "http://localhost:3000/api";

export {};