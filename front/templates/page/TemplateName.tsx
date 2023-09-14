import React, { FC } from 'react';
// @ts-ignore
import styles from './TemplateName.style.sass';

interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => (
  <div className={styles.TemplateName}>
      TemplateName Page
  </div>
);

export default TemplateName;
