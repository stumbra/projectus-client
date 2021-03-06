import React from 'react';
import { Container, Image, Overmax, Button } from './AvatarGroup.styled';
import { Tooltip } from 'react-tippy';
import { PersonType } from 'src/types/types';
import { useTranslation } from 'react-i18next';

type AvatarGroupType = {
  users: PersonType[];
  max: number;
  disabled?: boolean;
  size?: number | string;
};

const AvatarGroup = ({
  users,
  max,
  disabled = false,
  size,
}: AvatarGroupType): React.ReactElement => {
  const [isExpanded, setExpandability] = React.useState(false);

  const handleExpandability = () => {
    setExpandability(!isExpanded);
  };

  const { t } = useTranslation('common');

  return (
    <Container data-testid="avatar.group">
      {users.map((user, index) => {
        if (!isExpanded) {
          if (index + 1 <= max) {
            return (
              <Tooltip
                key={index}
                title={`${user.name} ${user.surname}`}
                position="top"
                trigger="mouseenter"
              >
                <Image src={user.avatar} avatar size={size} />
              </Tooltip>
            );
          } else if (index + 1 === users.length) {
            return (
              <Overmax
                data-testid={`avatar.group.overmax.${index}`}
                key={index}
                onClick={!disabled ? handleExpandability : undefined}
                disabled={disabled}
                size={size}
              >{`+${users.length - max}`}</Overmax>
            );
          }
        } else {
          return (
            <Tooltip
              key={index}
              title={`${user.name} ${user.surname}`}
              position="top"
              trigger="mouseenter"
            >
              <Image src={user.avatar} avatar size={size} />
            </Tooltip>
          );
        }
        return null;
      })}
      {isExpanded && (
        <Button onClick={handleExpandability}>
          {t('avatarGroup.showLess')}
        </Button>
      )}
    </Container>
  );
};

export default AvatarGroup;
