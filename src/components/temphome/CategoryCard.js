// src/components/HOME/CategoryCard.js
import React from 'react';
import './CategoryCard.css';
import ArrowIcon from '../../assets/icons/arrow.svg';

const CategoryCard = ({ iconUrl, title, description, onExploreClick }) => (
  <div className="category-card" onClick={() => onExploreClick(description, title)}>
    <img src={iconUrl} alt="" className="category-icon" />
    <h3 className="category-name">{title}</h3>
    <p className="category-description">{description}</p>
    <div className="explore-link">
      <span>Explore</span>
      <img src={ArrowIcon} alt="arrow" className="arrow-icon" />
    </div>
  </div>
);

export default CategoryCard;