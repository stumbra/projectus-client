import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button } from './ExpandedText.styled';

type ExpandedTextProps = {
  text: string;
};

const ExpandedText = ({ text }: ExpandedTextProps): React.ReactElement => {
  const [isExpanded, setExpandability] = React.useState(false);

  const handleExpandability = () => setExpandability(!isExpanded);

  const { t } = useTranslation('common');

  return (
    <React.Fragment>
      <Text isExpanded={isExpanded} data-testid="expanded.text.title">
        {text}
      </Text>
      <Button onClick={handleExpandability} data-testid="expanded.text.button">
        {isExpanded ? t('expandedText.viewLess') : t('expandedText.viewMore')}
      </Button>
    </React.Fragment>
  );
};

export default ExpandedText;
