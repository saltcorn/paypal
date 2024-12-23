Paypal module for Saltcorn
==========================

BETA RELEASE - IN DEVELOPMENT

To use this module:

1. Install in your Saltcorn Application from the module store. You will be prompted for the Client ID and Client Secret, and set mode to Live or Sandbox.

2. There should be a table for either products or transactions (or both). If you run
the payment on a transaction table you can better track if the payment was successful
inside Saltcorn.

3. Create view on this table with the view pattern `Paypal Callback`. Fill the field
that will be set if the payment is successful, and pick the destination views for
successful and failed payments (on the same table, so you should create a Show view 
for these outcomes).

4. Create an action (in a view, or insert triggger) of type `paypal_create_payment`.
Pick the callback view created above, and the amount and currency. Amount can be a field
or a formula. If it is a formula, you can use join fields to access the amount on another table, e.g. if you have a transaction table with a key field to the products table.

5. Encourage your users to click the button created in step 4.

6. Profit!