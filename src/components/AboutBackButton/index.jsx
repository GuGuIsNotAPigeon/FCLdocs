import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

export default function BackButton() {
  const { pathname } = useLocation();
  
  // 判断当前路径：/about 或 /about/ 是首页，其他是子页面
  const isAboutHome = pathname === '/about' || pathname === '/about/';
  const backTo = isAboutHome ? '/' : '/about';
  const backLabel = isAboutHome ? '← 返回首页' : '← 返回关于本站';

  return (
    <div style={{ marginBottom: '16px' }}>
      <Link
        to={backTo}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          fontSize: '0.9rem',
          color: 'var(--ifm-color-primary)',
          textDecoration: 'none',
          borderRadius: '8px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--ifm-color-emphasis-100)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        {backLabel}
      </Link>
    </div>
  );
}
