import Link from "next/link";

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header className="section_contact">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large is-contact-hero">
                <div className="contact_component">
                  <div className="contact_content-left">
                    <h1 className="heading-style-h2">QR Database</h1>
                    <p className="body-text">
                      QR Database 2: Please use the database below to view
                      inspection and asset records.
                    </p>
                  </div>
                  <div
                    id="w-node-_13503068-11ce-9d7d-7f2c-5c20bb077c5d-d652ad6d"
                    className="contact-cta_form-block w-form"
                  >
                    <p className="body-text text-neutral-600 italic">
                      The QR database is currently unavailable. If you need
                      access to inspection or asset records, please call our
                      team on{" "}
                      <a
                        href="tel:1300765594"
                        className="text-size-regular is-link"
                      >
                        1300 765 594
                      </a>{" "}
                      or email{" "}
                      <a
                        href="mailto:admin@allfireservices.com.au"
                        className="text-size-regular is-link"
                      >
                        admin@allfireservices.com.au
                      </a>
                      .
                    </p>
                    <div className="form_message-success-wrapper w-form-done">
                      <div className="form_message-success">
                        <div className="success-text">
                          Thank you! Your submission has been received!
                        </div>
                      </div>
                    </div>
                    <div className="form_message-error-wrapper w-form-fail">
                      <div className="form_message-error">
                        <div className="error-text">
                          Oops! Something went wrong while submitting the form.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="w-node-ab61a358-68b7-daf8-b053-1ab450d53068-d652ad6d"
                    className="contact_info-list"
                  >
                    <div className="contact_info-item">
                      <div className="text-size-medium text-weight-medium text-color-black">
                        Visit us:
                      </div>
                      <address className="body-text not-italic">
                        330 Wattle St, Ultimo NSW 2007, Australia
                      </address>
                    </div>
                    <div className="contact_info-item">
                      <div className="text-size-medium text-weight-medium text-color-black">
                        Call us:
                      </div>
                      <a
                        href="tel:1300765594"
                        className="text-size-regular is-link"
                      >
                        1300 765 594
                      </a>
                    </div>
                    <div className="contact_info-item">
                      <div className="text-size-medium text-weight-medium text-color-black">
                        Email us:
                      </div>
                      <a
                        href="mailto:admin@allfireservices.com.au"
                        className="text-size-regular is-link"
                      >
                        admin@allfireservices.com.au
                      </a>
                    </div>
                    <div className="contact_info-item">
                      <div className="text-size-medium text-weight-medium text-color-black">
                        Office Hours:
                      </div>
                      <div className="body-text">
                        Monday – Friday 07:00am – 6:30pm
                        <br />
                        Saturday 7:00am – 12:30pm
                        <br />
                        24/7 After Hours, Phone 0484 648 400
                      </div>
                    </div>
                  </div>
                  <p style={{ marginTop: "2rem" }}>
                    Need other help? <Link href="/contact">Contact us</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

      </div>
    </main>
  );
}
