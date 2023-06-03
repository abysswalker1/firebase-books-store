export const validate = {
  reuired: (value: string) => value ? undefined : 'Заполните поле',
  validateSelect: (value : string) => {
    return !value || value.length === 0 ? 'Please select a value' : undefined;
  }
}