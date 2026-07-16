SOLE HUB PRO

This is the strongest local version:
- Homepage
- Shop with search, brand filter and sorting
- Product details page
- Product gallery
- Size and color choices
- Cart with quantities
- Checkout
- Order history
- Login demo
- Admin dashboard
- Add products
- Upload product images from your computer
- Add different size options
- Delete products
- Manage order status
- Mobile navbar

Admin login:
Email: admin@solehub.com
Password: admin123

Run locally:
npm install
npm run dev

Open:
http://localhost:3000

To add real product images:
Login as admin → Admin → Products → upload pictures.

To make it public online:
1. Create a GitHub account.
2. Put this project on GitHub.
3. Create a Vercel account.
4. Import the GitHub repo into Vercel.
5. Click Deploy.
6. Vercel gives you a public link like:
   https://sole-hub.vercel.app

Important:
This version saves products/orders in your browser localStorage.
For a real business version, connect Supabase or Firebase database and Stripe/PayFast/Flutterwave/Orange Money payments.
