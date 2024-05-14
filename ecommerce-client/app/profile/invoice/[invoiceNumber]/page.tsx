
import Container from "@/app/components/Container";
import Invoice from "@/app/components/profile/Invoice";
export default async function InvoicePage({
  params,
}: {
  params: { invoiceNumber: string };
}) {
  return (
    <Container>
      <Invoice invoiceNumber={params.invoiceNumber} />
    </Container>
  );
}
