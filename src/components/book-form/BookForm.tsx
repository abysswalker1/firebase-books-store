import React, { useEffect } from 'react';
import { Form, Field, useFormState, FieldInputProps } from 'react-final-form';
import './bookForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  addAuthor,
  removeAuthor,
  RequestDocumentData,
  clearAndCloseForm,
} from '../../store/formSlice';
import Select from 'react-select';
import { useStoreDispatch } from '../../store/store';
import { getBooks, toggleIsFetching, booksApi } from '../../store/booksListSlice';
import Button from '@mui/material/Button/Button';
import { years } from '../../utils/years';
import { validate } from '../../utils/validate';

type FormValues = {
  name: string;
  date: { label: string; value: number };
  authors: string[];
};

const BookForm: React.FC = () => {
  const storeDispatch = useStoreDispatch();
  const dispatch = useDispatch();
  const currentDoc = useSelector((state: RootState) => state.form.currentDoc);
  const currentDocId = useSelector((state: RootState) => state.form.currentDocId);

  const options = years.map((date) => ({ value: date, label: date + '' }));

  const onSubmit = (values: FormValues) => {
    dispatch(toggleIsFetching(true));
    const newBook = {
      name: values.name,
      date: values.date.value,
      authors: currentDoc.authors,
    };

    if (currentDocId) {
      booksApi.update(currentDocId, newBook).then(() => storeDispatch(getBooks()));
    } else {
      booksApi.create(newBook).then(() => storeDispatch(getBooks()));
    }

    dispatch(clearAndCloseForm());
  };

  //@ts-ignore
  const ReactSelectAdapter = ({ input, ...rest }) => <Select {...input} {...rest} searchable />;

  const AuthorItem: React.FC<{ author: string; index: number }> = (props) => (
    <button
      className="book-form__authors-list-item"
      type="button"
      onClick={() => dispatch(removeAuthor(props.index))}>
      {props.author}
      <span>
        <i className="bi bi-x"></i>
      </span>
    </button>
  );

  return (
    <div className="book-form">
      <h1 className="book-form__title">
        {currentDocId ? (
          <>
            Редактировать книгу <i className="bi bi-pencil"></i>
          </>
        ) : (
          <>
            Добавить книгу <i className="bi bi-book"></i>
          </>
        )}
      </h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{ name: currentDoc.name }}
        render={({ handleSubmit, values }) => (
          <form action="">
            <Field name="name" validate={validate.reuired}>
              {({ input, meta }) => (
                <div className={`book-form__field ${meta.error && meta.touched ? 'error' : ''}`}>
                  <label htmlFor="name">
                    {meta.error && meta.touched ? <>{meta.error}</> : <>Название</>}
                  </label>
                  <div className="book-form__field-input std-input-wrap">
                    <input {...input} />
                  </div>
                </div>
              )}
            </Field>

            <Field name="date" component="input" validate={validate.validateSelect}>
              {({ meta, input }) => (
                <div className={`book-form__field ${meta.error && meta.touched ? 'error' : ''}`}>
                  <label htmlFor="name">
                    {meta.error && meta.touched ? <span>{meta.error}</span> : <span>Год</span>}
                  </label>
                  <ReactSelectAdapter input={input} options={options} />
                </div>
              )}
            </Field>

            <Field name="authors">
              {({ input, meta }) => (
                <div
                  className={`book-form__field authors-field ${
                    meta.error && meta.touched ? 'error' : ''
                  }`}>
                  <label htmlFor="author">
                    {meta.error && meta.touched ? <>{meta.error}</> : <>Авторы</>}
                  </label>
                  <div className="book-form__field-input std-input-wrap">
                    <input {...input} />

                    <button
                      className="add-author"
                      type="button"
                      onClick={() => {
                        dispatch(addAuthor(values.authors));
                      }}>
                      Добавить
                    </button>
                  </div>

                  <div className="book-form__authors-list">
                    {currentDoc.authors.map((author, index) => (
                      <AuthorItem author={author} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </Field>

            <div className="book-form__buttons">
              <Button
                className="book-form__buttons-close"
                type="button"
                onClick={() => dispatch(clearAndCloseForm())}
                color="error">
                Закрыть <i className="bi bi-x"></i>
              </Button>
              <Button
                className="book-form__buttons-submit"
                onClick={handleSubmit}
                color="primary"
                variant="outlined">
                {currentDocId ? 'Сохранить изменения' : 'Добавить книгу'}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default BookForm;
