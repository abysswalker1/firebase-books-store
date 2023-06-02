import React, { useEffect } from 'react';
import {Form, Field, useFormState} from 'react-final-form';
import './bookForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addAuthor, removeAuthor, RequestDocumentData, clearAndCloseForm} from '../../store/form';
import { fireStoreBooksApi } from '../../api/fireStoreApi';
import Select from 'react-select';
import { useStoreDispatch } from '../../store/store';
import { getBooks, toggleIsFetching, booksApi } from '../../store/booksList';
import Button from '@mui/material/Button/Button';

type Props = {
  
}

const BookForm: React.FC<Props> = () => {
  const storeDispatch = useStoreDispatch();
  const dispatch = useDispatch();
  const currentDoc = useSelector((state: RootState) => state.form.currentDoc);
  const currentDocId = useSelector((state: RootState) => state.form.currentDocId)

  const validate = {
    reuired: (value: string) => value ? undefined : 'Заполните поле',
    needOneAtLeast: () => {}  
  }

  const onSubmit = (values: RequestDocumentData) => {
    dispatch(toggleIsFetching(true));

    const newBook = {
      name: values.name,
      date: values.date,
      authors: currentDoc.authors
    }

    if( currentDocId ) {
      //@ts-ignore
      booksApi.update(currentDocId, newBook).then(() => storeDispatch(getBooks()));
    } else {
      //@ts-ignore
      booksApi.create(newBook).then(() => storeDispatch(getBooks()))
    }
    
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
      <h1 className='book-form__title'>
        { currentDocId 
           ? <>Редактировать книгу <i className="bi bi-pencil"></i></> 
           : <>Добавить книгу <i className="bi bi-book"></i></>
        }
      </h1>
      <Form 
        onSubmit={onSubmit}
        render={
          ({handleSubmit, values}) => (
          <form action="">
            <Field name='name' validate={validate.reuired} initialValue={currentDoc.name}>
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
              
              <Field
                name="date"
                component={ReactSelectAdapter}
                options={years}
              />
              
            </div>

            <Field name='authors' validate={validate.needOneAtLeast}>
              {({input, meta}) => (
                <div className={`book-form__field authors-field ${(meta.error && meta.touched) ? 'error' : ''}`} >
                  <label htmlFor="author">{(meta.error && meta.touched) ? <>{meta.error}</> : <>Авторы</>}</label>
                  <div className="book-form__field-input std-input-wrap">
                    <input {...input}/>

                    <button 
                      className='add-author' 
                      type='button' 
                      onClick={() => {dispatch(addAuthor(values.authors));}}
                    >
                    Добавить
                  </button>
                  </div>

                  <div className="book-form__authors-list">
                    {currentDoc.authors.map((author, index) => <AuthorItem author={author} index={index}/>)}
                  </div>
                </div>
              )}
            </Field> 

            <div className="book-form__buttons">
              <Button className='book-form__buttons-close' 
                      type='button' 
                      onClick={() => dispatch(clearAndCloseForm())}
                      color='error'
              >
                      Закрыть <i className="bi bi-x"></i>
              </Button>
              <Button className='book-form__buttons-submit' 
                      onClick={handleSubmit}
                      color='primary'
                      variant="outlined"
              >
                      {currentDocId ? 'Сохранить изменения' :'Добавить книгу' }
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default BookForm;