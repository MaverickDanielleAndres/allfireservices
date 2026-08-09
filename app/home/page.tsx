import { redirect } from "next/navigation";

// Dead Webflow-import page that pulled in heavy third-party assets
// (cdn.prod.website-files.com images + videos). Redirect to the real
// homepage so the route still resolves but the heavy content never ships.
export default function Page() {
  redirect("/");
}
