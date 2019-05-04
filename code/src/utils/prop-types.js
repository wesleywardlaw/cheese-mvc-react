import PropTypes from 'prop-types';

const menuPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

const cheesePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: categoryPropType.isRequired,
});

export {
  menuPropType,
  cheesePropType,
  categoryPropType,
}