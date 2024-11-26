import { DisplayForm } from "./DisplayForm";
import ContentSection from "../components/ContentSection";

export default function SettingsDisplay() {
  return (
    <ContentSection
      title="Display"
      desc="Turn items on or off to control what's displayed in the app."
    >
      <DisplayForm />
    </ContentSection>
  );
}
