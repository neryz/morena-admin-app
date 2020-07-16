const selectColor = (type) => {
  switch (type) {
    case 'Preafiliado':
      return '#FFFDDA';
    case 'Protagonista':
      return '#E4FFCC';
    case 'Convencidos':
      return '#FFF5F1';
  }
};

export { selectColor };
