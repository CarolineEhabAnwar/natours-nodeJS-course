/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51NWj6OHmfIWwrK6PLzCvjXR5u3zdvgxEKe7WERGD1K03dojc69tRXNdNkunSM3dnziksoS0RZ08zGn3ocTYuCFmI004rmMkgsh'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
