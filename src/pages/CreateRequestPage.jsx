import RequestForm from "../components/RequestForm/RequestForm";

function CreateRequestPage() {
  const handleSubmit = (formData) => {
    console.log("Отправка заявки:", formData);
    // будет позже
  };

  return (
    <main>
      <RequestForm onSubmit={handleSubmit} />
    </main>
  );
}

export default CreateRequestPage;