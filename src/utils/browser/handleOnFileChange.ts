const handleOnFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files ?? [];

  if (files.length !== 1) {
    throw new Error("Only one file is allowed");
  }

  const file = files[0];
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(fileArrayBuffer);
};
