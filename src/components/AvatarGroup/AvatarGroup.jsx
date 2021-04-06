import React from 'react';
import { Container, Image, Overmax, Button } from './AvatarGroup.styled';
import { Tooltip } from 'react-tippy';

const AvatarGroup = ({ users, max, disabled = false, size }) => {
  const [isExpanded, setExpandability] = React.useState(false);

  const handleExpandability = () => {
    setExpandability(!isExpanded);
  };

  return (
    <Container>
      {users.map((user, index) => {
        if (!isExpanded) {
          if (index + 1 <= max) {
            return (
              <Tooltip
                key={index}
                title={`${user.name} ${user.surname}`}
                position="top"
                trigger="mouseenter "
              >
                <Image src={user.avatar} avatar size={size} />
              </Tooltip>
            );
          } else if (index + 1 === users.length)
            return (
              <Overmax
                key={index}
                onClick={!disabled ? handleExpandability : undefined}
                disabled={disabled}
                size={size}
              >{`+${users.length - max}`}</Overmax>
            );
        } else {
          return (
            <Tooltip
              key={index}
              title={`${user.name} ${user.surname}`}
              position="top"
              trigger="mouseenter "
            >
              <Image src={user.avatar} avatar size={size} />
            </Tooltip>
          );
        }
      })}
      {isExpanded && <Button onClick={handleExpandability}>Show less</Button>}
    </Container>
  );
};

export default AvatarGroup;
