import React from 'react';

export default function SearchArea(props) {
  return (
    <div className='container'>
      <div style={{ marginTop: 10 }} className='row'>
        <section className='col-lg-6 order-0 float-left'>
          <div style={{ marginTop: 35, marginBottom: 10 }}>
            <form onSubmit={props.handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control width100'
                  placeholder='Search Movies'
                  onChange={props.handleChange}
                  value={props.value}
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
