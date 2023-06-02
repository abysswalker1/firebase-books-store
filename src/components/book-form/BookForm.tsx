import React, { useEffect } from 'react';
import {Form, Field, useFormState} from 'react-final-form';
import { BookType } from '../../types';
import './bookForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addAuthor, removeAuthor} from '../../store/form';
import { fireStoreBooksApi } from '../../api/fireStoreApi';
import Select from 'react-select';
import { useStoreDispatch } from '../../store/store';
import { getBooks } from '../../store/booksList';

interface IFieldValues {
  name: string
  author: string
}

const BookForm: React.FC = () => {
  const storeDispatch = useStoreDispatch();
  const dispatch = useDispatch();
  const api = fireStoreBooksApi();
  const authors = useSelector((state: RootState) => state.form.authors);

  const validate = {
    reuired: (value: string) => value ? undefined : 'Заполните поле',
    needOneAtLeast: () => {
     
    }  
  }

  const onSubmit = (values: any) => {
    //@ts-ignore
    api.create({name: values.name, authors: authors,}).then(storeDispatch(getBooks()))
  }

  const years = [
    {value: 2023, label: "2023"},
    {value: 1800, label: "1800"}
  ]

  //@ts-ignore
  const ReactSelectAdapter = ({ input, ...rest }) => (
    <Select {...input} {...rest} searchable />
  )
  

  const AuthorItem: React.FC<{author: string, index: number}> = (props) => (
    <button className="book-form__authors-list-item" type='button' onClick={() => dispatch(removeAuthor(props.index))}>
      {props.author}
      <span>
        <i className="bi bi-x"></i>
      </span>
    </button>
  )

  return (
    <div className='book-form'>
      <Form 
        onSubmit={onSubmit}
        render={
          ({handleSubmit, values}) => (
          <form action="">
            <Field name='name' validate={validate.reuired}>
              {({input, meta}) => (
                <div className={`book-form__field ${(meta.error && meta.touched) ? 'error' : ''}`}>
                  <label htmlFor="name">{(meta.error && meta.touched) ? <>{meta.error}</> : <>Название</>}</label>
                  <div className="book-form__field-input std-input-wrap">
                    <input {...input}/>
                  </div>
                </div>
              )}
            </Field>
              
            <div className="book-form__field">
              <label htmlFor="name">Год</label>
              <div className="book-form__field-input std-input-wrap">
              <Field
                name="date"
                component={ReactSelectAdapter}
                options={years}
              />
              </div>
            </div>
            <Field name='authors' validate={validate.needOneAtLeast}>
              {({input, meta}) => (
                <div className={`book-form__field authors-field ${(meta.error && meta.touched) ? 'error' : ''}`} >
                  <label htmlFor="author">{(meta.error && meta.touched) ? <>{meta.error}</> : <>Авторы</>}</label>
                  <div className="book-form__field-input std-input-wrap">
                    <input {...input}/>
                  </div>

                  <button className='add-author' type='button' onClick={() => dispatch(addAuthor(values.authors))}>
                    Добавить
                  </button>

                  <div className="book-form__authors-list">
                    {authors.map((author, index) => <AuthorItem author={author} index={index}/>)}
                  </div>
                </div>
              )}
            </Field> 

            <div className="book-form__buttons">
              <button className='book-form__buttons-close' type='button'>Закрыть</button>
              <button className='book-form__buttons-submit' onClick={handleSubmit}>Добавить книгу</button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default BookForm;