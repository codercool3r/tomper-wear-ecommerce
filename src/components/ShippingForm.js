import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useOrderContext } from '../context/order_context';
import { Country, State, City } from 'country-state-city';

const countries = Country.getAllCountries();
const states = State.getStatesOfCountry('IN');
const cities = City.getCitiesOfCountry('IN');

function ShippingForm({ confirmShipping }) {
  const {
    shipping: {
      name,
      address: { line1, postal_code, city, state, country },
    },
    updateShipping,
  } = useOrderContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      return toast.error('Enter your Name');
    }
    if (!line1) {
      return toast.error('Enter your Address');
    }
    if (!postal_code) {
      return toast.error('Enter your Zip Code');
    }
    if (!city) {
      return toast.error('Enter your City');
    }
    if (!state) {
      return toast.error('Enter your State');
    }
    if (!country) {
      return toast.error('Enter your Country');
    }

    return confirmShipping();
  };

  return (
    <Wrapper className='page-100'>
      <div>
        <div className='title'>
          <h2>Shipping</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className='form-control'>
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Full name'
              value={name}
              onChange={updateShipping}
            />
          </div>
          {/* end name */}
          {/* address line 1 */}
          <div className='form-control'>
            <input
              type='text'
              name='line1'
              className='input'
              placeholder='Address'
              value={line1}
              onChange={updateShipping}
            />
          </div>
          {/* end address line 1 */}
          {/* address postal code */}
          <div className='form-control'>
            <input
              type='text'
              name='postal_code'
              className='input'
              placeholder='Zip Code'
              value={postal_code}
              onChange={updateShipping}
            />
          </div>
          {/* end address postal code */}
          {/* address city */}
          <div className='form-control'>
            <select
              name='city'
              className='input sort-input'
              value={city}
              onChange={updateShipping}
            >
              <option value=''>Select City</option>
              {cities.map((item, index) => {
                return (
                  <option key={index} value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end address city */}
          {/* address state */}
          <div className='form-control'>
            <select
              name='state'
              className='input sort-input'
              value={state}
              onChange={updateShipping}
            >
              <option value=''>Select State</option>
              {states.map((item, index) => {
                return (
                  <option key={index} value={item.stateCode}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end address state */}
          {/* address country */}
          <div className='form-control'>
            <select
              name='country'
              className='input sort-input'
              value={country}
              onChange={updateShipping}
            >
              <option value=''>Select Country</option>
              {countries.map((item, index) => {
                return (
                  <option key={index} value={item.countryCode}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end address country */}
          <button type='submit' className='btn shipping-btn'>
            confirm
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  div {
    min-width: 300px;
  }
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form-control {
      margin-bottom: 1.25rem;
      h5 {
        margin-bottom: 0.5rem;
      }
    }
    .input {
      width: 100%;
      padding: 0.5rem;
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      border-color: transparent;
      letter-spacing: var(--spacing);
    }
    .input::placeholder {
      text-transform: capitalize;
    }
    .sort-input {
      max-width: 300px;
      border-color: transparent;
      font-size: 1rem;
      text-transform: capitalize;
      padding: 0.25rem 0.5rem;
    }
    .links {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .link {
      font-size: smaller;
      color: var(--clr-primary-1);
      text-transform: capitalize;
    }
    .shipping-btn {
      margin-top: 1.25rem;
      width: 100%;
    }
  }
`;
export default ShippingForm;
