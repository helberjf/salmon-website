import { LegalPage } from './LegalPage';
import { company } from '@/data/company';
import { founder } from '@/data/founder';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * Política de Privacidade (LGPD — Lei nº 13.709/2018).
 *
 * Descreve o que o site realmente faz: o formulário não grava respostas e só
 * monta uma mensagem que o próprio visitante envia pelo WhatsApp; o site não
 * usa cookies de rastreamento nem ferramentas de analytics. Ao instalar
 * analytics, pixel ou um backend de formulário, esta política precisa mudar.
 */
export default function PrivacyPolicy() {
  const { t } = useI18n();
  const controller = { company: company.legalName || company.name, cnpj: company.cnpj };

  return (
    <LegalPage title={t('Política de Privacidade')}>
      <p>
        {t(
          'Esta Política explica como a {company}, inscrita no CNPJ {cnpj}, com sede no Rio de Janeiro/RJ ("Bridge Point"), trata os dados pessoais de quem visita este website ou entra em contato conosco, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).',
          controller,
        )}
      </p>

      <h2>{t('1. Quem é o controlador e como falar com a encarregada')}</h2>
      <p>
        {t(
          'A controladora dos dados é a {company}. A encarregada pelo tratamento de dados pessoais é {name}, que pode ser contatada pelo e-mail {email}.',
          { ...controller, name: founder.name, email: company.email },
        )}
      </p>

      <h2>{t('2. Quais dados tratamos')}</h2>
      <ul>
        <li>
          {t(
            'Dados informados no formulário de cotação: nome, empresa, cargo, e-mail, telefone/WhatsApp, cidade e estado, tipo de estabelecimento, produto de interesse e, se você quiser, volume, frequência de compra e mensagem.',
          )}
        </li>
        <li>
          {t(
            'Dados trocados diretamente conosco por WhatsApp, e-mail ou telefone, na medida do que você nos enviar.',
          )}
        </li>
        <li>
          {t(
            'Registros de acesso gerados automaticamente pelo servidor: endereço IP, data e hora, página acessada e tipo de navegador.',
          )}
        </li>
        <li>
          {t(
            'A preferência de idioma, guardada apenas no armazenamento local do seu navegador (localStorage), sem identificar você.',
          )}
        </li>
      </ul>
      <p>
        {t(
          'Não usamos cookies de publicidade, pixels de rastreamento nem ferramentas de analytics, e não tratamos dados sensíveis.',
        )}
      </p>

      <h2>{t('3. Como funciona o formulário')}</h2>
      <p>
        {t(
          'O formulário não grava suas respostas em nossos servidores. Ele apenas organiza as informações em uma mensagem, que é aberta no WhatsApp para que você mesmo decida enviá-la. A partir do envio, a conversa também está sujeita à política de privacidade do WhatsApp (Meta Platforms).',
        )}
      </p>

      <h2>{t('4. Para que usamos os dados e com qual base legal')}</h2>
      <ul>
        <li>
          {t(
            'Responder à sua solicitação e preparar propostas comerciais — procedimentos preliminares a um contrato (art. 7º, V, da LGPD).',
          )}
        </li>
        <li>
          {t(
            'Manter o relacionamento comercial e informar sobre produtos relacionados ao seu pedido — legítimo interesse (art. 7º, IX), sempre com a opção de pedir para não receber mais contatos.',
          )}
        </li>
        <li>
          {t(
            'Registrar a sua autorização de contato dada no formulário — consentimento (art. 7º, I), que pode ser revogado a qualquer momento.',
          )}
        </li>
        <li>
          {t(
            'Cumprir obrigações legais e regulatórias, como a guarda de registros de acesso e de documentos fiscais — obrigação legal (art. 7º, II).',
          )}
        </li>
      </ul>

      <h2>{t('5. Com quem compartilhamos')}</h2>
      <ul>
        <li>
          {t(
            'Com a Norwell AS, exportadora norueguesa que representamos, quando a sua solicitação envolver os produtos dela e for necessário para preparar a proposta ou executar o fornecimento.',
          )}
        </li>
        <li>
          {t(
            'Com prestadores de serviço que viabilizam a nossa operação, como hospedagem do site, e-mail e WhatsApp, limitados ao necessário.',
          )}
        </li>
        <li>{t('Com autoridades públicas, quando houver obrigação legal ou ordem judicial.')}</li>
      </ul>
      <p>{t('Não vendemos nem alugamos dados pessoais.')}</p>

      <h2>{t('6. Transferência internacional')}</h2>
      <p>
        {t(
          'Alguns dados podem ser transferidos para fora do Brasil: para a Noruega, quando compartilhados com a Norwell AS (país do Espaço Econômico Europeu, sujeito ao Regulamento Geral de Proteção de Dados — GDPR), e para os países onde ficam os servidores dos prestadores de serviço. Essas transferências seguem as hipóteses do art. 33 da LGPD.',
        )}
      </p>

      <h2>{t('7. Por quanto tempo guardamos')}</h2>
      <ul>
        <li>{t('Contatos que não resultaram em negócio: até 12 meses após o último contato.')}</li>
        <li>
          {t(
            'Clientes: durante a relação comercial e por mais 5 anos, para cumprir prazos fiscais e legais.',
          )}
        </li>
        <li>{t('Registros de acesso ao site: 6 meses, conforme o Marco Civil da Internet (Lei nº 12.965/2014).')}</li>
      </ul>
      <p>{t('Depois desses prazos, os dados são excluídos ou anonimizados.')}</p>

      <h2>{t('8. Seus direitos')}</h2>
      <p>
        {t(
          'Nos termos do art. 18 da LGPD, você pode pedir a qualquer momento: confirmação de que tratamos seus dados; acesso; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informação sobre com quem compartilhamos; e revogação do consentimento.',
        )}
      </p>
      <p>
        {t(
          'Basta escrever para {email}. Respondemos em até 15 dias. Se não ficar satisfeito, você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
          { email: company.email },
        )}
      </p>

      <h2>{t('9. Segurança')}</h2>
      <p>
        {t(
          'O site é servido apenas por conexão criptografada (HTTPS) e com políticas de segurança do navegador. O acesso aos dados recebidos é restrito à equipe que precisa deles para atender você.',
        )}
      </p>

      <h2>{t('10. Público do site')}</h2>
      <p>
        {t('Este website é destinado a empresas e profissionais e não se dirige a menores de 18 anos.')}
      </p>

      <h2>{t('11. Alterações desta Política')}</h2>
      <p>
        {t(
          'Esta Política pode ser atualizada para refletir mudanças no site ou na legislação. A data da versão vigente aparece ao final da página.',
        )}
      </p>
    </LegalPage>
  );
}
