import React, { FC } from 'react';
import styles from './TemplateName.module.sass';

interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => (
  <div className={styles.TemplateName}>
      TemplateName Page
  </div>
);

export default TemplateName;
