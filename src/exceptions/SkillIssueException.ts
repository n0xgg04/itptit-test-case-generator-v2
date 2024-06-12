export default class SkillIssueException extends Error{
    constructor(message: string) {
        super(`[SKILL ISSUE] ${message}`,{
            cause: "TEMPLATE_INVALID_CONFIG"
        });
    }

}
