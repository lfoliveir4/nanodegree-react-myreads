import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <div>
    <div className="list-books-title">
      <h1>MyReads</h1>
      <div className="open-search">
        <Link to='/search'></Link>
      </div>
    </div>
  </div>
)

export default Header
