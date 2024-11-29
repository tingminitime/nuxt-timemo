export type SocialLinkType = 'website' | 'linkedin' | 'github' | 'facebook' | 'instagram' | 'x' | 'thread' | 'youtube' | 'medium'

export interface SocialLinks {
  type: SocialLinkType
  url: string
}
