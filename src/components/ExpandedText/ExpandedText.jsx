import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button } from './ExpandedText.styled';

const ExpandedText = ({ text }) => {
  const [isExpanded, setExpandability] = React.useState(false);

  const handleExpandability = () => {
    setExpandability(!isExpanded);
  };

  const { t } = useTranslation('common');

  return (
    <React.Fragment>
      <Text isExpanded={isExpanded}>{text}</Text>
      <Button onClick={handleExpandability}>
        {isExpanded ? t('expandedText.viewLess') : t('expandedText.viewMore')}
      </Button>
    </React.Fragment>
  );
};

export default ExpandedText;
