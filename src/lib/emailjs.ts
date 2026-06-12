/**
 * EmailJS credentials. Both the Book Appointment form and the Contact form
 * send to the same template using these constants.
 *
 * Template variables expected:
 *   form_type, name, email, phone, hospital, specialist, date, time, message
 */
export const EMAILJS_SERVICE_ID = "service_pe58qgb";
export const EMAILJS_TEMPLATE_ID = "template_mymqub6";
export const EMAILJS_PUBLIC_KEY = "OQbUNNKQWYeXiBMHI";

export type EmailParams = {
  form_type: string;
  name: string;
  email: string;
  phone: string;
  hospital: string;
  specialist: string;
  date: string;
  time: string;
  message: string;
};

export async function sendEmail(params: EmailParams) {
  const emailjs = await import("@emailjs/browser");
  emailjs.init(EMAILJS_PUBLIC_KEY);
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY);
}
